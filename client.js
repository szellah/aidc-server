const axios = require('axios');

const queryParams = {
    id : 1
};


axios.post('http://localhost:8080', queryParams)
.then(res => {
    console.log(res.data)
})
.catch(error => {
    console.error(error)
})