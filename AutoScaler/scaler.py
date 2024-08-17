from prometheus_client import start_http_server, Gauge, CollectorRegistry, REGISTRY
import time
import numpy as np
from sklearn.preprocessing import StandardScaler
import joblib
from tensorflow import keras
import random
import requests

# Initialize the gauge metric
# registry = CollectorRegistry()
desired_replicas = Gauge('custom_autoscaler_desired_replicas', 'Desired number of replicas based on ML model', ['namespace', 'deployment'])
# try:
# model = keras.models.load_model('model.keras')
with open('model.json', 'r') as json_file:
    model_json = json_file.read()
model = keras.models.model_from_json(model_json)

# Load the model weights
model.load_weights('model_weights.h5')
print("Model loaded successfully.")


# except Exception as e:
    # print(f"Error loading model: {e}")
try:
    scaler = joblib.load('scaler.pkl')
    print("Successfully loaded")
except Exception as e:
    print(f"Error loading StandardScaler: {e}")

def extract_values_by_instance(data):
    instance_dict = {}
    for entry in data:
        instance = entry['metric']['instance']
        value = entry['value']
        if instance not in instance_dict:
            instance_dict[instance] = []
        instance_dict[instance].append(value)
    return instance_dict

def get_total_http_requests():
    # url = f'http://a207edc4d15814356b16a127c39f57be-474668322.us-east-1.elb.amazonaws.com/api/v1/query?query=increase(http_requests_total{job="my-nodejs-app"}[1m])'

    query = 'increase(http_requests_total{job="my-nodejs-app"}[1m])'
    url = f'http://prometheus-server/api/v1/query?query={requests.utils.quote(query)}'    
    # Send the GET request
    response = requests.get(url)
    # print(response)
    response.raise_for_status()  # Raise an exception for HTTP errors
    
    data = response.json().get('data', {}).get('result', [])
    # print(data)
    values_by_instance = extract_values_by_instance(data)
    
    total_http_requests = 0
    for instance, values in values_by_instance.items():
        http_requests = 0
        for value in values:
            http_requests += float(value[1])
        values_by_instance[instance] = http_requests
        total_http_requests += http_requests
    
    return total_http_requests

def predict_pods(minute, hour, day, req_per_min, avg_response_time):
    # scaler = StandardScaler()
    custom_input = np.array([[minute, hour, day, req_per_min, avg_response_time]])
    custom_input_scaled = scaler.transform(custom_input)
    prediction = model.predict(custom_input_scaled)
    return prediction[0][0]/7

def update_metrics():
    # Update the gauge with the predicted number of replicas
    namespace = 'default'
    deployment = 'my-app'
    prediction = predict_pods(1, 23, 7, 900+random.randint(100,500), 0.7)
    response = get_total_http_requests()
    print(response)
    prediction = predict_pods(1, 21, 1, response, 1)
    desired_replicas.labels(namespace=namespace, deployment=deployment).set(prediction)
    print(f"Desired replicas for {namespace}/{deployment}: {prediction}")

if __name__ == '__main__':
    start_http_server(8000)  # Expose metrics on port 8000
    while True:
        update_metrics()
        time.sleep(3)  # Update metrics every 30 seconds
