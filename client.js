const axios = require("axios");

const queryParams = {
    reportChoice: "Budynek",
    building: 1,
    floor: 2
};

axios
    .post("http://localhost:8080/getArticleReport", queryParams)
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.error(error);
    });
