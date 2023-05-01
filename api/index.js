const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const port = 3001;
require("dotenv").config({ path: require("find-config")(".env") });
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);


async function request(query) {

    const response = await openai.createModeration({
        input: query,
      });

    console.log(response)
  return response.data.results;
}


app.get("/api", (req, res) => {
  request(req.query.message)
    .then((result) => {
        // console.log('result', result.result.data.results)
      res.json(result);
    })
    .then((data) => {
      output = data;
      console.log(data);
    });
});

app.post("/api", (req, res) => {
    request(req.body.message)
      .then((result) => {
          // console.log('result', result.result.data.results)
        res.json(result);
      })
      .then((data) => {
        output = data;
        console.log(data);
      });
  });

// app.post("/api", (req, res) => {

// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
  

