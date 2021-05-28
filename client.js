const axios = require('axios');

const queryParams = {
	userId: 2,
    password : "haslo",
};

axios
	.post('http://localhost:8080/test', queryParams)
	.then((res) => {
		console.log(res.data);
	})
	.catch((error) => {
		console.error(error);
	});