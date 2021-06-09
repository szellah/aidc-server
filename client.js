const axios = require("axios");

const queryParams = {


    accountId: 2

};

axios
    .post("http://localhost:8080/getAccountInfo", queryParams)
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.error(error);
    });




