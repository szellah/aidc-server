const axios = require('axios');

const queryParams = {
    Id : 13,
  
};


axios.post('http://localhost:8080/test', queryParams)
.then(res => {
    console.log(res.data)
})
.catch(error => {
    console.error(error)
})