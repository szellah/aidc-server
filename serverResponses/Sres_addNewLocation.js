function Sres_addNewLocation(pool, res, params) {
	Sres_promise(pool, params.id)
		.then((rows) => {
			res.send(rows[0]);
		})
		.catch((error) => {
			console.log(error);
		});
}

function Sres_promise(
	pool,
	{ locationId, building, floor, room, historyId, userId }
) {
	return new Promise((resolve, reject) => {
		const { query } = require('mysql');

		pool.query(
			`INSERT INTO \`locations\` (\`LocationId\`, \`Building\`, \`Floor\`, \`Room\`) VALUES (${locationId}, ${building}, ${floor}, ${room})`,
			(error, results, fields) => {
				if (error) {
					reject(error.message);
				} else {
					console.log(
						`Dodano lokalizację {{ LocationId=${locationId}, Building=${building}, Floor=${floor}, Room=${room} }}`
					);
				}
			}
		);

		pool.query(
			`INSERT INTO \`history\`(\`HistoryId\`, \`Action\`, \`Time\`, \`FirstId\`, \`SecondId\`) VALUES (${historyId}, 5, NOW(), ${locationId}, ${userId})`,
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
	Sres_addNewLocation,
};
