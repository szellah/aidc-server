const axios = require('axios');

const queryParams = {
	userId: 2,
    password : "LUDWIG7",
};

axios
	.post('http://localhost:8080/changeAccountPasword', queryParams)
	.then((res) => {
		console.log(res.data);
	})
	.catch((error) => {
		console.error(error);
	});