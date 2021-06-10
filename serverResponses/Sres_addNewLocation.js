/**
 * Funkcja odpowiedzialna za dodanie nowej lokacji<br>
 * Po jej użyciu do aplikacji zostanie odesłany wynik tej funkcji do ServerResponse<br>
 * @function Sres_addNewLocation
 * @param {object} pool - Pula połączeń z bazą danych mySQL, zarządza połączeniami z serwerem
 * @param {function} res - Funkcja odsyłająca pakiety danych do klienta
 * @param {object} params - Zbiór parametrów
 */
function Sres_addNewLocation(pool, res, params) {
		const { ServerResponse } = require('./ServerResponse');

		const contentCreator = Sres_promise(pool, params);

		ServerResponse(contentCreator, res);
}

/**
 * Funkcja, która pobiera pulę połączeń i rozbija argument params przekazany przez funkcję Sres
 * @function Sres_promise
 * @param {object} pool - Pula połączeń z baża danych mySQL, zarządza połączeniami z serwerem
 * @param {object} params - Rozbity argument params na Location i AccountID
 */
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
						`INSERT INTO \`history\`(\`HistoryId\`, \`Action\`, \`Time\`, \`FirstId\`, \`SecondId\`) VALUES ( NULL, 5, NOW(), ${locationId}, ${AccountId})`,
						(error, results, fields) => {
							if (error) {
								reject(error.message);
							} else {
								resolve(`Dodano lokalizację ${building}/ ${room} `);
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
