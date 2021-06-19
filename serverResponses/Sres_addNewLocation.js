function Sres_addNewLocation(pool, res, params) {

		const { ServerResponse } = require('./ServerResponse');

		const contentCreator = Sres_promise(pool, params);

		ServerResponse(contentCreator, res);
}

function Sres_promise(
	pool,
	{ Location, AccountId }
) {
	const {building, floor, room} = Location;
	return new Promise((resolve, reject) => {
		const { query } = require('mysql');

		pool.query(
			`INSERT INTO \`locations\` (\`LocationId\`, \`Building\`, \`Floor\`, \`Room\`) VALUES ( NULL, ${building}, ${floor}, ${room})`,
			(error, results, fields) => {
				if (error) {
					reject(error.message);
				} else {
					const locationId = results.insertId;
					pool.query(
						`INSERT INTO \`history\` (Action, Time, FirstId, SecondId) VALUES ( 5, NOW(), ${locationId}, ${AccountId})`,
						(error, results, fields) => {
							if (error) {
								reject(error.message);
							} else {
								resolve(`Dodano lokalizację ${building}/ ${floor} /${room} `);
							}
						}
					);
				}
			}
		);

		
	});
}

module.exports = {
	Sres_addNewLocation,
};
