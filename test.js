const axios = require("axios");

const options = {
  method: "POST",
  url: "https://relativyze.com/api/v1/relativyze",
  data: {
    text1: "First text",
    text2: "Second text",
  },
  headers: {
    Authorization: "YOUR_API_KEY",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
