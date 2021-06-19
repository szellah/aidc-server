const axios = require("axios");

const queryParams = {
    UserId: 1,
    User:  { Name: "Jank", Surname: "Kowalski", Login: "JKowal", Email: "Jkowal@wp.pl",Rank: 1, State: 1 }
};

axios
    .post("http://localhost:8080/addNewUser", queryParams)
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.error(error);
    });
