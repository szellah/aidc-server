function Sres_getLocationInfo(pool, res, params) {
	Sres_promise(pool, params.id)
		.then((rows) => {
			res.send(rows[0]);
		})
		.catch((error) => {
			console.log(error);
		});
}

function Sres_promise(pool, { locationId }) {
	return new Promise((resolve, reject) => {
		const { query } = require('mysql');

		pool.query(
			`SELECT * FROM \`locations\` WHERE LocationId = ${locationId}`,
			(error, results, fields) => {
				if (error) {
					reject('error');
				} else {
					console.log(results[0]);
					resolve(results);
				}
			}
		);
	});
}

module.exports = {
	Sres_getLocationInfo,
};
