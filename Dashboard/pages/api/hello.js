// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require("axios");

export default async function handler(req, res) {
  console.log("-----"+process.env.NEXT_PUBLIC_API_GATEWAY);
  if (req.method === "POST") {
    const { query } = req.body;
    const response = await axios.get(
      `http://prometheus-server/api/v1/query?query=${query}`
    );
    console.log(response.data);
    res.status(200).json(response.data);
  }
}
