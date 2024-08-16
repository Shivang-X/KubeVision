const axios = require('axios');

const apiUrl = '<App URL>'; // Replace with your API endpoint

async function sendRequest(i) {
  try {
    const response = await axios.get(apiUrl); // Change the method and data as per your API
    console.log(`Request ${i + 1}: Status ${response.status}`);
  } catch (error) {
    console.error(`Request ${i + 1}: Error ${error.status}`);
  }
}

async function sendMultipleRequests() {
  const requests = [];
  for (let i = 0; i < 10000; i++) {
      requests.push(sendRequest(i));
      await sleep(4) 
  }
  await Promise.all(requests);
  console.log('All requests sent');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

sendMultipleRequests();

