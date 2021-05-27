function Sres_deleteLocation(pool, res, params) {
	Sres_promise(pool, params.id)
		.then((rows) => {
			res.send(rows[0]);
		})
		.catch((error) => {
			console.log(error);
		});
}

function Sres_promise(pool, { locationId, historyId, userId }) {
	return new Promise((resolve, reject) => {
		const { query } = require('mysql');

		pool.query(
			`DELETE FROM \`locations\` WHERE LocationId = ${locationId}`,
			(error, results, fields) => {
				if (error) {
					reject(error.message);
				} else {
					console.log(`Usunięto lokalizację o LocationId=${locationId}`);
				}
			}
		);

		pool.query(
			`INSERT INTO \`history\`(\`HistoryId\`, \`Action\`, \`Time\`, \`FirstId\`, \`SecondId\`) VALUES (${historyId}, 6, NOW(), ${locationId}, ${userId})`,
			(error, results, fields) => {
				if (error) {
					reject(error.message);
				} else {
					console.log(results[0]);
					resolve(results);
				}
			}
		);
	});
}

module.exports = {
	Sres_deleteLocation,
};
