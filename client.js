const axios = require("axios");

const queryParams = {

    article: {
        ArticleId: 312,
        Name: "testUpdate2",
        category: "testUpdate2",
        location: 4,
        description: "testUpdateOpis",
    },

    ArticleId: 314,
    LocationId: 12,
    AccountId: 1,
    UserId: 1,
};

axios
    .post("http://localhost:8080/dislocateArticle", queryParams)
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.error(error);
    });

