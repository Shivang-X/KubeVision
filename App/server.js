import express from "express";
import promClient from "prom-client";

const app = express();
const register = new promClient.Registry();

// Create a counter metric for total HTTP requests
const httpRequestCounter = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});
register.registerMetric(httpRequestCounter);

// Create a histogram metric for request duration
const httpRequestDuration = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.5, 1, 1.5, 2, 5],
});
register.registerMetric(httpRequestDuration);

// Create a summary metric for request latency
const httpRequestLatency = new promClient.Summary({
  name: "http_request_latency_seconds",
  help: "Latency of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
});
register.registerMetric(httpRequestLatency);

app.use((req, res, next) => {
  if (req.path === "/metrics") {
    return next();
  }
  const start = Date.now();

  // Measure latency
  const endLatency = httpRequestLatency.startTimer({
    method: req.method,
    route: req.route ? req.route.path : "",
    status_code: res.statusCode,
  });

  const endDuration = httpRequestDuration.startTimer({
    method: req.method,
    route: req.route ? req.route.path : "",
    status_code: res.statusCode,
  });

  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : "",
      status_code: res.statusCode,
    });
    endDuration();
    endLatency({ status_code: res.statusCode });
  });

  next();
});

// Endpoint to expose the metrics
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// Your other routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/data", (req, res) => {
  // Example data to return
  const data = {
    message: "Hello from the API",
    timestamp: new Date(),
  };

  // Send the response as JSON
  res.json(data);
});

app.get("/throw-error", (req, res) => {
  throw new Error("Intentional Crash");
});

app.get("/exit", (req, res) => {
  res.send("Server will crash");
  process.exit(1);
});

app.get("/syntax-error", (req, res) => {
  res.send("Server will crash");
  eval("This is a syntax error");
});

app.get("/infinite-loop", (req, res) => {
  res.send("Server will crash");
  while (true) {}
});

app.get("/memory-leak", (req, res) => {
  res.send("Server will crash");
  const memoryLeak = [];
  while (true) {
    memoryLeak.push(new Array(1000000).join("a"));
  }
});

app.get("/unhandled-promise", (req, res) => {
  res.send("Server will crash");
  Promise.reject(new Error("Intentional Unhandled Rejection"));
});

app.get("/delayed-response5", (req, res) => {
  setTimeout(() => {
    res.send("Response after 5 seconds");
  }, 5000); // 5000 milliseconds = 5 seconds
});

app.get("/delayed-response10", (req, res) => {
  setTimeout(() => {
    res.send("Response after 10 seconds");
  }, 10000); // 5000 milliseconds = 5 seconds
});

// Other routes omitted for brevity

app.listen(80, () => {
  console.log("Server is running on port 80");
});
