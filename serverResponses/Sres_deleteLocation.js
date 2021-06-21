/**
 * Usuwanie Lokalizacji<br>
 * Funkcja odpowiedzialna za usunięcie nowej lokacji<br>
 * Po jej użyciu do aplikacji zostanie odesłany wynik tej funkcji do ServerResponse<br>
 * @function Sres_deleteLocation
 * @param {object} pool - Pula połączeń z bazą danych mySQL, zarządza połączeniami z serwerem
 * @param {function} res - Funkcja odsyłająca pakiety danych do klienta
 * @param {number} AccountId  Id użytkownika usuwającego lokalizacje, następnie zostaje dodany do historii
 * @param {number} locationId -  Id lokalizacji która zostanie usunięta
 * 
 */
function Sres_deleteLocation(pool, res, params) {
	const { ServerResponse } = require('./ServerResponse');

	const contentCreator = Sres_promise(pool, params);

	ServerResponse(contentCreator, res);
}

/**
 * Funkcja, która pobiera pulę połączeń i rozbija argument params przekazany przez funkcję Sres
 * @function Sres_promise
 * @param {object} pool - Pula połączeń z baża danych mySQL, zarządza połączeniami z serwerem
 * @param {object} params - Rozbity argument params na locationId i AccountID
 */
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
