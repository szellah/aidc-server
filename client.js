const axios = require("axios");
const SHA256 = require('crypto-js/sha256');
const {passwordGenerator} = require('./handlers/passwordGenerator');

const queryParams = {
    UserId: 13
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


axios.post('http://192.168.1.80:8080/resetPassword', queryParams)
.then(res => {
    console.log(res.data)
})
.catch(error => {console.log(error)})


// const pass = passwordGenerator();
// console.log(pass);
// console.log(SHA256(pass).toString());





