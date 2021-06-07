const axios = require('axios');

const queryParams = {
	locationId: 16,
	AccountId: 1,
};

axios
	.post('http://localhost:8080/deleteLocation', queryParams)
	.then((res) => {
		console.log(res.data);
	})
	.catch((error) => {
		console.error(error);
	});
