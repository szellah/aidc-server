const axios = require("axios");

const queryParams = {
    
        articleId: 300
    
};

axios
    .post("http://localhost:8080/getArticleInfo", queryParams)
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.error(error);
    });




