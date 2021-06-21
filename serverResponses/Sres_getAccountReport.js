/**
 * Funkcja odpowiedzialna za zwracanie tabelo użytkowników
 * Po jej użyciu do aplikacji zostanie odesłany wynik tej funkcji do ServerResponse<br>
 * @function Sres_getAccountReport
 * @param {object} pool - Pula połączeń z bazą danych mySQL, zarządza połączeniami z serwerem
 * @param {function} res - Funkcja odsyłająca pakiety danych do klienta
 * @param {object} params - Zbiór parametrów
 * 
 * @category Sres
 */
function Sres_getAccountReport(pool, res, params) {
	const { ServerResponse } = require('./ServerResponse');

	const contentCreator = Sres_promise(pool, params);

	ServerResponse(contentCreator, res);
}

function Sres_promise(pool) {
	return new Promise((resolve, reject) => {
		const { query } = require('mysql');
		

		pool.query(
			`SELECT AccountId, Name, Surname, Login FROM \`accounts\` `,
			(error, results, fields) => {
				if (error) {
					reject(error);
				} else {
					let table = results.map((row) => {
						return {
							column1: row.Name,
							column2: row.Surname,
							column3: row.Login,
							id: row.AccountId.toString()
						};
					});
					console.log(table);
					resolve(table);
				}
			}
		);
	});
}

module.exports = {
	Sres_getAccountReport,

};

