import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

// Define the path and headers for the CSV file
const csvWriter = createCsvWriter({
  path: 'output.csv',
  header: [
    { id: 'minute', title: 'Minute' },
    { id: 'hour', title: 'Hour' },
    { id: 'day', title: 'Day' },
    { id: 'reqPerMin', title: 'Req/Min' },
    { id: 'avgResponseTime', title: 'AvgResponseTime' },
    { id: 'numberOfPods', title: 'NumberOfPods' },
  ],
});

// Function to generate request rates based on the specified conditions
const getRequestRate = (day, hour) => {
  if (day >= 1 && day <= 4) {
    if (hour >= 8 && hour < 18) {
      return Math.floor(Math.random() * 101) + 100; // 100-200 req/min
    } else if (hour >= 18 && hour < 24) {
      return Math.floor(Math.random() * 401) + 400; // 400-800 req/min
    } else {
      return Math.floor(Math.random() * 61) + 20; // 20-80 req/min
    }
  } else if (day >= 5 && day <= 7) {
    if (hour >= 0 && hour < 8) {
      return Math.floor(Math.random() * 71) + 80; // 80-150 req/min
    } else if (hour >= 8 && hour < 18) {
      return Math.floor(Math.random() * 601) + 400; // 400-1000 req/min
    } else {
      return Math.floor(Math.random() * 401) + 800; // 800-1200 req/min
    }
  }
};

// Function to calculate the number of pods and scale it between 1 to 10
const calculateNumberOfPods = (reqPerMin, avgResponseTime) => {
  // Calculate a base number of pods based on reqPerMin and avgResponseTime
  let numberOfPods = (avgResponseTime * reqPerMin *10)/1200;

  // Scale numberOfPods to fit between 1 and 10
//   numberOfPods = Math.max(1, Math.min(10, Math.round(numberOfPods / 12))); // Adjust scaling factor

  return Math.ceil(numberOfPods);
};

// Function to generate data from day 1 at 00:00 to day 7 at 23:59
const generateSequentialData = () => {
  const data = [];
  for (let day = 1; day <= 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute++) {
        const reqPerMin = getRequestRate(day, hour);
        const avgResponseTime = (0.3 + (Math.random() * 0.7)).toFixed(2);

        // Calculate the number of pods
        const numberOfPods = calculateNumberOfPods(reqPerMin, avgResponseTime);

        data.push({
          minute: minute,
          hour: hour,
          day: day,
          reqPerMin: reqPerMin,
          avgResponseTime: avgResponseTime,
          numberOfPods: numberOfPods,
        });
      }
    }
  }
  return data;
};

// Generate the data
const records = generateSequentialData();

// Write the data to the CSV file
csvWriter.writeRecords(records)
  .then(() => {
    console.log('CSV file written successfully');
  })
  .catch((err) => {
    console.error('Error writing CSV file', err);
  });
