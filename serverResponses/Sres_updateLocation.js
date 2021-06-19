function Sres_updateLocation(pool, res, params) {
	const { ServerResponse } = require('./ServerResponse');

	const contentCreator = Sres_promise(pool, params);

	ServerResponse(contentCreator, res);
}

function Sres_promise(
	pool,
	{ Location,  AccountId }
) {
	const {LocationId, Building, Floor, Room} = Location;
	return new Promise((resolve, reject) => {
		const { query } = require('mysql');

		pool.query(
			`UPDATE \`locations\` SET \`Building\`=${Building},\`Floor\`=${Floor},\`Room\`=${Room} WHERE LocationId = ${LocationId}`,
			(error, results, fields) => {
				if (error) {
					reject(error.message);
				} else {
					pool.query(
						`INSERT INTO \`history\`(\`HistoryId\`, \`Action\`, \`Time\`, \`FirstId\`, \`SecondId\`) VALUES ( NULL, 7, NOW(), ${LocationId}, ${AccountId})`,
					(error, results, fields) => {
						if (error) {
							reject(error.message);
						} else {
							resolve(`Zmieniono dane lokalizacji ${Building}/ ${Floor} /${Room} `);
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
