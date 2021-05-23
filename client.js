const axios = require('axios');

const queryParams = {
    id : 1
};


// axios.post('http://192.168.1.80:8080/test', queryParams)
// .then(res => {
//     console.log(res.data)
// })
// .catch(error => {
//     console.error(error)
// })

// axios.post('http://192.168.0.4:8080/getNameInfo', queryParams)
// .then(res => {
//     console.log(res.data)
// })
// .catch(error => {
//     console.error(error)
// })


axios.post('http://192.168.0.4:8080/testowy')
.then(res => {
    console.log(res.data)
})
.catch(error => {console.log(error)})






