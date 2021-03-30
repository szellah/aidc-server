const axios = require('axios');


axios.post('http://localhost:8080', {
    id: 2
})
.then(res => {
    console.log(res.data)
})
.catch(error => {
    console.error(error)
})