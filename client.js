const axios = require("axios");

const queryParams = {
    UserId: 1,
    article: {
    ArticleId: parseInt("3"), 
      Name: "day", 
      Category: "klawiatura", 
      LocationId: parseInt("8"), 
      Description: ""
    }
};

axios
    .post("http://localhost:8080/updateArticleInfo", queryParams)
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.error(error);
    });




