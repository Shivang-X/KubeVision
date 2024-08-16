# KubeVision: AI-Powered Kubernetes Autoscaler

KubeVision is an advanced AI-driven autoscaler for Kubernetes, designed to optimize resource management by predicting future demand. Leveraging machine learning models, KubeVision enhances the Horizontal Pod Autoscaler (HPA) by making proactive scaling decisions, ensuring applications maintain high performance and reliability even during sudden traffic spikes.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Screenshots](#screenshots)
- [License](#license)

## Introduction

KubeVision brings intelligence to Kubernetes autoscaling by leveraging historical performance data and machine learning algorithms to anticipate and respond to workload changes. Traditional autoscalers are reactive, but KubeVision is predictive, allowing for more efficient resource allocation and minimizing the risk of performance degradation.

In addition to its powerful autoscaling capabilities, KubeVision includes a comprehensive dashboard that provides detailed insights into your Kubernetes environment. The dashboard displays real-time information about all Kubernetes resources, including pods, services, and deployments. It also tracks incoming traffic, response times, and how traffic is distributed among different pods. This holistic view allows for better monitoring and management of your applications, ensuring that they remain resilient and performant under varying loads.

## Features

- **Predictive Autoscaling:** Uses AI to forecast future demand based on historical data.
- **Custom Metrics Integration:** Exposes custom metrics for fine-tuned scaling decisions.
- **Seamless Kubernetes Integration:** Easily integrates with existing Kubernetes deployments.
- **Scalable Architecture:** Supports large-scale applications with complex scaling needs.
- **Optimized Resource Utilization:** Minimizes resource wastage by scaling only when necessary.

## Architecture

KubeVision is composed of several key components:

- **Prometheus:** Collects and stores metrics from your Kubernetes cluster.
- **Helm:** Manages Kubernetes deployments and configurations.
- **TensorFlow:** Provides the machine learning framework for training and running predictive models.
- **Python:** Powers the backend logic and ML model integration.
- **Prometheus Client:** Exposes custom metrics used by the Horizontal Pod Autoscaler (HPA).

![alt text](<Demo/Architecture.jpg>)

## Installation

### Prerequisites

- Kubernetes cluster (EKS, GKE, AKS, or self-managed)
- Helm 3.x
- Python 3.x
- Prometheus Operator installed in your cluster
- NextJS

### Step-by-Step Guide

**Clone the Repository:**

```bash
git clone https://github.com/yourusername/kubevision.git
cd kubevision
```

**Install Prometheus Using Helm:**

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/prometheus
helm repo update
```

**Apply Prometheus config:**

```bash
cd Manifests/Prometheus
helm upgrade -i prometheus prometheus-community/prometheus -f values.yaml
```

**Apply all manifests for k8s resources:**
```
cd App
kubectl apply -f .
cd ../AutoScaler
kubectl apply -f .
cd ../Dashboard
kubectl apply -f .
```

Now all the resouces must have been applied and the UI can be accessed via node_ip:30001 in the browser.

## Screenshots
![alt text](<Demo/image1.png>)
![alt text](<Demo/image2.png>)
![alt text](<Demo/image3.png>)
![alt text](<Demo/image4.png>)
![alt text](<Demo/image5.png>)

## Article
https://medium.com/@shivangx27/ai-powered-kubernetes-autoscaler-1590a5207b4e

## License
This project is licensed under the MIT License 
