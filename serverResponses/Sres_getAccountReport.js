/**
 * Funkcja pobiera Sres_promise i odsyła jego wynik
 * w tym przypadku apropo informacji o koncie 
 * @param {var} pool    - połączenie z bazą danych  
 * @param {var} res     - funkcja odsyłająca pakiety danych do klienta
 * @param {var} params  - parametry Konta
 */
 function Sres_getAccountReport(pool, res, params) {
	Sres_promise(pool, params.id)
		.then((rows) => {
			res.send(rows);
		})
		.catch((error) => {
			console.log(error);
		});
}

/**
 * Funkcja wysyła zapytanie do servera o informacje apropo Konta o podanym ID
 * pobiera pulę połączeń oraz rozbija(dekonstrukcja) parametry przekazane przez funkcję Sres
 * @param {var} pool 	-połączenie z bazą danych
 * @param {var} Id  	-ID Konta
 * @returns zwraca informacje o danym Koncie albo error
 */
function Sres_promise(pool, { id }) {
	return new Promise((resolve, reject) => {
		const { query } = require('mysql');

		pool.query(
			`SELECT AccountId, Name, Surname, Email FROM \`accounts\` `,
			(error, results, fields) => {
				if (error) {
					reject(error);
				} else {

					let table = results.map((row) => {
						return {
							key: row.AccountId,
							fields: [row.Name, row.Surname, row.Email],
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

