const axios = require("axios");

const queryParams = {
    
        AccountId: 12,
        Location:{
            building: 4,
            floor: 123,
            room: 33,
        }
    
};

axios
    .post("http://localhost:8080/addNewLocation", queryParams)
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.error(error);
    });




