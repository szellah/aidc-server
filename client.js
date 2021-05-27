const axios = require('axios');

const queryParams = {
	locationId: 24,
	building: 3,
	floor: 2,
	room: 1,
	historyId: 10,
	userId: 22,
};

axios
	.post('http://localhost:8080/test', queryParams)
	.then((res) => {
		console.log(res.data);
	})
	.catch((error) => {
		console.error(error);
	});
