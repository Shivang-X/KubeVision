// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require("axios");

export default async function handler(req, res) {
//   console.log(`${process.env.API_GATEWAY}/function2`);
  if (req.method === "POST") {
    try {
        const response = await axios.post(
          `${process.env.API_GATEWAY}/function2`,
        //   `https://6gyd28kpyd.execute-api.us-east-1.amazonaws.com/prod/function2`,
          req.body
        );
        console.log("-----------------------------" + process.env.API_GATEWAY + "--------------------")
        console.log("response");
    } catch (error) {
      console.log(error);
        return res.json(`${process.env.API_GATEWAY}/function2`);
    }
    res.status(200).json("Good");
  }
}
