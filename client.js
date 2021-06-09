const axios = require("axios");

const queryParams = {


    accountId: 2

};

axios
    .post("http://localhost:8080/getAccountInfo", {accountId: 2})
    .then((res) => {
        let r = res.data;
        console.log(r.message.Name);
    })
    .catch((error) => {
        console.error(error);
    });




