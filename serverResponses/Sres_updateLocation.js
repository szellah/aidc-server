function Sres_updateLocation(pool, res, params) {
	const { ServerResponse } = require('./ServerResponse');

	const contentCreator = Sres_promise(pool, params);

	ServerResponse(contentCreator, res);
}

function Sres_promise(
	pool,
	{ Location,  AccountId }
) {
	const {locationId, building, floor, room} = Location;
	return new Promise((resolve, reject) => {
		const { query } = require('mysql');

		pool.query(
			`UPDATE \`locations\` SET \`Building\`=${building},\`Floor\`=${floor},\`Room\`=${room} WHERE LocationId = ${locationId}`,
			(error, results, fields) => {
				if (error) {
					reject(error.message);
				} else {
					pool.query(
						`INSERT INTO \`history\`(\`HistoryId\`, \`Action\`, \`Time\`, \`FirstId\`, \`SecondId\`) VALUES ( NULL, 7, NOW(), ${locationId}, ${AccountId})`,
					(error, results, fields) => {
						if (error) {
							reject(error.message);
						} else {
							resolve(`Zmieniono dane lokalizacji ${building}/${room} `);
						}
					}
					);
				}
			}
		);

		
	});
}

module.exports = {
	Sres_updateLocation,
};
