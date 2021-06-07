function Sres_deleteLocation(pool, res, params) {
	const { ServerResponse } = require('./ServerResponse');

	const contentCreator = Sres_promise(pool, params);

	ServerResponse(contentCreator, res);
}

function Sres_promise(pool, { locationId, AccountId }) {
	return new Promise((resolve, reject) => {
		const { query } = require('mysql');

		pool.query(
			`DELETE FROM \`locations\` WHERE LocationId = ${locationId}`,
			(error, results, fields) => {
				if (error) {
					reject(error.message);
				} else {
					pool.query(
						`INSERT INTO \`history\`(\`HistoryId\`, \`Action\`, \`Time\`, \`FirstId\`, \`SecondId\`) VALUES ( NULL, 6, NOW(), ${locationId}, ${AccountId})`,
						(error, results, fields) => {
							if (error) {
								reject(error.message);
							} else {
								resolve(`Usunięto lokalizację o id równym ${locationId}`);
							}
						}
					);
				}
			}
		);

		
	});
}

module.exports = {
	Sres_deleteLocation,
};
