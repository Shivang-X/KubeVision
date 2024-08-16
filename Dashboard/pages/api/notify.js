// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require("axios");

export default async function handler(req, res) {
  const response = await axios.post(`${process.env.API_GATEWAY}/function1`, {
    email: "shivang2727@gmail.com",
    body: "Your application is receiving high traffic. Number of requests per minute are going beyond 200",
  });
  console.log(response.data);
  res.status(200).json(response.data);
}
