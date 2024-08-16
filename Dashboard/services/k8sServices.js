const axios = require("axios");
// const dns = require('dns');
// dns.setServers(['kube-dns.kube-system.svc.cluster.local']);

const ip =
  "10.100.190.25";

// Function to make a GET request
export const getServices = async () => {
  try {

    const response = await axios.post(`/api/hello`, {query: `kube_service_info`});

    // Accessing nested data
    const status = response.data.status;
    const resultType = response.data.data.resultType;
    const result = response.data.data.result;

    const getUniqueServices = (data) => {
      console.log(data)
      const seen = new Set();
      return data.filter((entry) => {
        const svc = entry.metric.service;
        if (seen.has(svc)) {
          return false;
        }
        seen.add(svc);
        return true;
      });
    };

    return getUniqueServices(result);
  } catch (error) {
    // Handle error if request fails
    console.error("Error fetching data:", error);
  }
};

export const getPods = async () => {
  try {
    // Make a GET request to your API endpoint
    // const response = await axios.get(
    //   `http://${ip}/api/v1/query?query=kube_pod_info`
    // );

    const response = await axios.post(`/api/hello`, {query: `kube_pod_info`});

    // Accessing nested data
    const status = response.data.status;
    const resultType = response.data.data.resultType;
    const result = response.data.data.result;

    const getUniquePods = (data) => {
      const seen = new Set();
      return data.filter((entry) => {
        console.log(entry);
        const pod = entry.metric.pod;
        if (seen.has(pod)) {
          return false;
        }
        seen.add(pod);
        return true;
      });
    };

    return getUniquePods(result);
  } catch (error) {
    // Handle error if request fails
    console.error("Error fetching data:", error);
  }
};

export const getDeployments = async () => {
  try {
    // Make a GET request to your API endpoint
    // const response = await axios.get(
    //   `http://${ip}/api/v1/query?query=kube_deployment_status_replicas`
    // );

    const response = await axios.post(`/api/hello`, {query: `kube_deployment_status_replicas`});

    // Accessing nested data
    const status = response.data.status;
    const resultType = response.data.data.resultType;
    const result = response.data.data.result;

    console.log(result);

    const getUniqueDeploy = (data) => {
      const seen = new Set();
      return data.filter((entry) => {
        console.log(entry);
        const deploy = entry.metric.deployment;
        if (seen.has(deploy)) {
          return false;
        }
        seen.add(deploy);
        return true;
      });
    };
    return getUniqueDeploy(result);
  } catch (error) {
    // Handle error if request fails
    console.error("Error fetching data:", error);
  }
};

export const getReplicaSets = async () => {
  // const response = await axios.get("http://a207edc4d15814356b16a127c39f57be-474668322.us-east-1.elb.amazonaws.com/api/v1/query?query=kube_replicaset_created");
  const response = await axios.post(`/api/hello`, {query: `kube_replicaset_created`});
  const result = response.data.data.result;

  const getUniqueRS = (data) => {
    const seen = new Set();
    return data.filter((entry) => {
      console.log(entry);
      const rs = entry.metric.replicaset;
      if (seen.has(rs)) {
        return false;
      }
      seen.add(rs);
      return true;
    });
  };

  return getUniqueRS(result);
}

export const getPVC = async () => {
  // const response = await axios.get("http://a207edc4d15814356b16a127c39f57be-474668322.us-east-1.elb.amazonaws.com/api/v1/query?query=kube_persistentvolumeclaim_info");
  const response = await axios.post(`/api/hello`, {query: `kube_persistentvolumeclaim_info`});
  const result = response.data.data.result;

  const getUniquePVC = (data) => {
    const seen = new Set();
    return data.filter((entry) => {
      const pvc = entry.metric.persistentvolumeclaim;
      if (seen.has(pvc)) {
        return false;
      }
      seen.add(pvc);
      return true;
    });
  };

  return getUniquePVC(result);
}

export const getPV = async () => {
  // const response = await axios.get("http://a207edc4d15814356b16a127c39f57be-474668322.us-east-1.elb.amazonaws.com/api/v1/query?query=kube_persistentvolume_info");
  const response = await axios.post(`/api/hello`, {query: `kube_persistentvolume_info`});
  const result = response.data.data.result;

  const getUniquePV = (data) => {
    const seen = new Set();
    return data.filter((entry) => {
      const pv = entry.metric.persistentvolume;
      if (seen.has(pv)) {
        return false;
      }
      seen.add(pv);
      return true;
    });
  };

  return getUniquePV(result);
}

export const getHPA = async () => {
  // const response = await axios.get("http://a207edc4d15814356b16a127c39f57be-474668322.us-east-1.elb.amazonaws.com/api/v1/query?query=kube_horizontalpodautoscaler_info");
  const response = await axios.post(`/api/hello`, {query: `kube_horizontalpodautoscaler_info`});
  const result = response.data.data.result;

  const getUniqueHPA = (data) => {
    const seen = new Set();
    return data.filter((entry) => {
      const hpa = entry.metric.horizontalpodautoscaler;
      if (seen.has(hpa)) {
        return false;
      }
      seen.add(hpa);
      return true;
    });
  };

  return getUniqueHPA(result);
}

export const getValuesByInstance = async () => {
  try {
    let totalHttpRequests = 0;
    let httpRequests = 0;

    // Make a GET request to your API endpoint
    // const response = await axios.get(
    //   `http://${ip}/api/v1/query?query=increase(http_requests_total{job="my-nodejs-app"}[1m])`
    // );

    const response = await axios.post(`/api/hello`, {query: `increase(http_requests_total{job="my-nodejs-app"}[1m])`});

    console.log(response);

    function extractValuesByInstance(data) {
      const instanceDict = {};
      data.forEach((entry) => {
        const instance = entry.metric.instance;
        const value = entry.value;
        if (!instanceDict[instance]) {
          instanceDict[instance] = [];
        }
        instanceDict[instance].push(value);
      });
      return instanceDict;
    }

    let valuesByInstance = extractValuesByInstance(response.data.data.result);

    for (const instance in valuesByInstance) {
      valuesByInstance[instance].forEach((value) => {
        totalHttpRequests += parseInt(value[1]);
        httpRequests += parseInt(value[1]);
      });
      valuesByInstance[instance] = httpRequests;
      httpRequests = 0;
    }

    return valuesByInstance;
  } catch (error) {
    // Handle error if request fails
    console.error("Error fetching data:", error);
  }
};

export const getTotalRequests = async () => {
  try {
    let totalHttpRequests = 0;
    let httpRequests = 0;

    // Make a GET request to your API endpoint
    // const response = await axios.get(
    //   `http://${ip}/api/v1/query?query=increase(http_requests_total{job="my-nodejs-app"}[1m])`
    // );

    const response = await axios.post(`/api/hello`, {query: `increase(http_requests_total{job="my-nodejs-app"}[1m])`});

    function extractValuesByInstance(data) {
      const instanceDict = {};
      data.forEach((entry) => {
        const instance = entry.metric.instance;
        const value = entry.value;
        if (!instanceDict[instance]) {
          instanceDict[instance] = [];
        }
        instanceDict[instance].push(value);
      });
      return instanceDict;
    }

    let valuesByInstance = extractValuesByInstance(response.data.data.result);

    for (const instance in valuesByInstance) {
      valuesByInstance[instance].forEach((value) => {
        totalHttpRequests += parseInt(value[1]);
        httpRequests += parseInt(value[1]);
      });
      valuesByInstance[instance] = httpRequests;
      httpRequests = 0;
    }

    return totalHttpRequests;
  } catch (error) {
    // Handle error if request fails
    console.error("Error fetching data:", error);
  }
};

export const getAvgResponseTime = async () => {
  try {
    let avgResponseTime = 0;

    // Make a GET request to your API endpoint
    // const response = await axios.get(
    //   `http://${ip}/api/v1/query?query=(rate(http_request_duration_seconds_sum{job="my-nodejs-app"}[1m]) / rate(http_request_duration_seconds_count{job="my-nodejs-app"}[1m]))`
    // );

    const response = await axios.post(`/api/hello`, {query: `(rate(http_request_duration_seconds_sum{job="my-nodejs-app"}[1m]) / rate(http_request_duration_seconds_count{job="my-nodejs-app"}[1m]))`});

    // Accessing nested data
    const status = response.data.status;
    const resultType = response.data.data.resultType;
    const result = response.data.data.result;
    const totalPods = response.data.data.result.length;

    const greenColor = "\x1b[32m"; // Green color
    const resetColor = "\x1b[0m"; // Reset color to default
    const text = "Average Response time";

    // Log the extracted data
    // console.log(`${greenColor}\x1b[1m${text}\x1b[0m${resetColor}`);
    // // console.log(`--------------------------------`)
    // result.forEach((element, i) => {
    //     console.log(`Pod${i+1} : ${element.metric.instance}`)
    //     console.log(`Average Response time : ${element.value[1] == "NaN" ? 0 : element.value[1]}`)
    //     console.log(`--------------------------------`)
    // });

    function extractValuesByInstance(data) {
      const instanceDict = {};
      data.forEach((entry) => {
        const instance = entry.metric.instance;
        const value = entry.value;
        if (!instanceDict[instance]) {
          instanceDict[instance] = [];
        }
        instanceDict[instance].push(value);
      });
      return instanceDict;
    }

    // console.log(response)
    const valuesByInstance = extractValuesByInstance(response.data.data.result);

    for (const instance in valuesByInstance) {
      // console.log(`Instance: ${instance}`);
      valuesByInstance[instance].forEach((value) => {
        // console.log(`  Value: ${value[1]}`);
        // console.log(parseFloat(value[1] == "NaN" ? 0 : value[1]))
        avgResponseTime += parseFloat(value[1] == "NaN" ? 0 : value[1]);
      });
    }

    console.log(`Average Response time : ${avgResponseTime / totalPods}`);
    return avgResponseTime / totalPods;
  } catch (error) {
    // Handle error if request fails
    console.error("Error fetching data:", error);
  }
};

export const getDesiredReplicas = async () => {
  try {
    // Make a GET request to your API endpoint
    // const response = await axios.get(
    //   `http://${ip}/api/v1/query?query=custom_autoscaler_desired_replicas{deployment="my-app",namespace="default"}`
    // );

    const response = await axios.post(`/api/hello`, {query: `custom_autoscaler_desired_replicas{deployment="my-app",namespace="default"}`});

    console.log(response);

    // Accessing nested data
    const status = response.data.status;
    const resultType = response.data.data.resultType;
    const result = response.data.data.result;

    const greenColor = "\x1b[32m"; // Green color
    const resetColor = "\x1b[0m"; // Reset color to default
    const text = "Service";

    return result;
  } catch (error) {
    // Handle error if request fails
    console.error("Error fetching data:", error);
  }
};

export const getNodeData = async () => {
  try {
    // const result = await axios.get(
    //   "http://a207edc4d15814356b16a127c39f57be-474668322.us-east-1.elb.amazonaws.com/api/v1/query?query=node_os_info"
    // );

    const result = await axios.post(`/api/hello`, {query: `node_os_info`});
    console.log(result.data.data.result[0]);
    return result.data.data.result[0];
  } catch (error) {
    console.log(error);
  }
};

export const getCPUStats = async () => {
  // const result = await axios.get(
  //   "http://a207edc4d15814356b16a127c39f57be-474668322.us-east-1.elb.amazonaws.com/api/v1/query?query=machine_cpu_cores"
  // );
  const result = await axios.post(`/api/hello`, {query: `machine_cpu_cores`});
  return result.data.data.result[0];
};

export const getMemoryStats = async () => {
  // const result = await axios.get(
  //   "http://a207edc4d15814356b16a127c39f57be-474668322.us-east-1.elb.amazonaws.com/api/v1/query?query=machine_memory_bytes"
  // );
  const result = await axios.post(`/api/hello`, {query: `machine_memory_bytes`});
  return result.data.data.result[0];
};

export const getIncommingRequestsData = async () => {
  let totalStatus4 = 0;
  let totalStatus2And3 = 0;

  // const response = await axios.get(
  //   `http://a207edc4d15814356b16a127c39f57be-474668322.us-east-1.elb.amazonaws.com/api/v1/query?query=increase(http_requests_total{job="my-nodejs-app"}[5m])`
  // );

  const response = await axios.post(`/api/hello`, {query: `increase(http_requests_total{job="my-nodejs-app"}[5m])`});
  console.log(response.data.data.result);

  response.data.data.result.forEach((item) => {
    const statusCode = item.metric.status_code;
    const value = parseFloat(item.value[1]);

    // Check if status code starts with '4'
    if (statusCode.startsWith("4")) {
      totalStatus4 += value;
    }
    // Check if status code starts with '2' or '3'
    else if (statusCode.startsWith("2") || statusCode.startsWith("3")) {
      totalStatus2And3 += value;
    }
  });

  console.log(totalStatus4);
  console.log(totalStatus2And3);

  return {
    totalStatus4,
    totalStatus2And3,
  };
};

const updateReqperMinData = async () => {
  // const response = await getTotalRequests();
  const totalRequests = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
  const response = await axios.post(
    "/api/save",
    { time: new Date().getMinutes().toString(), count: totalRequests }
  );
  console.log(response)
  // if (typeof window !== "undefined") {
  //   // const data = JSON.parse(localStorage.getItem("Req/min"));
  //   // data.shift();
  //   // setReqperMinGraph([...data, {month: new Date().getMinutes(), desktop: response}])
  //   // localStorage.setItem(
  //   //   "Req/min",
  //   //   JSON.stringify([
  //   //     ...data,
  //   //     { month: new Date().getMinutes().toString(), desktop: totalRequests },
  //   //   ])
  //   // );
  //   const response = await axios.post(
  //     "/api/save",
  //     { time: new Date().getMinutes().toString(), count: totalRequests }
  //   );
  //   const sendSMS = async () => {
  //     const response = await axios.post(
  //       // "https://ikscjyfm5tfqzd5dclym5s4gq40plbxf.lambda-url.us-east-1.on.aws",
  //       "https://10r6622n26.execute-api.us-east-1.amazonaws.com/prod/function1",
  //       {
  //         msg: "Your application is receiving high traffic.",
  //       }
  //     );
  //     // console.log(response);
  //   };


  //   console.log(data);
  // }
};

setInterval(updateReqperMinData, 6000);
