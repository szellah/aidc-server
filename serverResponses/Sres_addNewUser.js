/**
 * Dodawanie nowego użytkownika<br>
 * odsyła poprzez HTTP informacje o tym czy udało się dodać 
 * użytkownika o podanych parametrach
 * @function 
 * @param {object} pool Połączenie do bazy danych
 * @param {function} res Funkcja zwracająca informacje poprzez HTTP POST
 * @param {number} UserId Id użytkownika dodającego nowego użytkownika, zapisane zostanie jako wpis w historii
 * @param {string} name Imię nowego użytkownika
 * @param {string} surname Nazwisko nowego użytkownika
 * @param {string} login Login nowego użytkownika
 * @param {string} email Email nowego użytkownika, potrzebny do wysłania mu wiadomości mailowych w tym wnowego hasła
 * @param {number} rank Ranga nowego użytkownika, administratorska bądź zwykła
 * @param {number} state Stan nowego użytkownika, aktywn bądź nieaktywny
 *  
 * @category Sres
 */
function Sres_addNewUser(pool, res, params) {
	const { ServerResponse } = require('./ServerResponse');
	const contentCreator = Sres_promise(pool, params);
	ServerResponse(contentCreator, res);
}

function Sres_promise(
	pool,
	{ UserId, User: { Name, Surname, Login, Email, Rank, State } }
) {
	return new Promise((resolve, reject) => {
		//pobranie funkcji query z mysql
		const { query } = require('mysql');
		// ustawienie daty rrrr-mm-dd hh:mm:ss
		const date = new Date(new Date().setHours(new Date().getHours() + 2))
			.toISOString()
			.slice(0, 19)
			.replace('T', ' ');
		//wysłanie zapytania sql do bazy sql

		if (
			Name == '' ||
			Surname == '' ||
			Login == '' ||
			Email == '' ||
			Rank == 0 ||
			State == 0
		) {
			reject(new Error('Wypełnij wszystkie pola'));
		} else {
			pool.query(
				`INSERT INTO accounts ( AccountId, Name, Surname, Login, Password, Email, Rank, State, InventoryId, PersonalUseID) VALUES ( NULL ,'${Name}','${Surname}','${Login}',' ','${Email}','${Rank}','${State}', 4, 4)`,
				(error, results) => {
					const accountId = results.insertId;
					const {setupPassword} = require("./Sres_resetPassword");
					setupPassword(pool, { UserId: accountId})
					.then((message) => {
						console.log(message);
						pool.query(
						`INSERT INTO \`locations\` (\`LocationId\`, \`Building\`, \`Floor\`, \`Room\`) VALUES ( NULL, -1, 1, ${accountId}), ( NULL, -1, 2, ${accountId})`,
						(error, results) => {
							const inventoryid = results.insertId;
							const personaluseid = results.insertId + 1;
							pool.query(
								`UPDATE accounts SET InventoryId = '${inventoryid}', Personaluseid = '${personaluseid}' WHERE AccountId = ${accountId}`,
								(error, results) => {
									//prosty handling błędu
									if (error) reject(error);
									// jeżeli nigdzie nie pojawił się błąd to wpis do historii
									else {
										pool.query(
											`INSERT INTO history (Action, Time, FirstId, SecondId) VALUES ('8','${date}','${results.insertId}','${UserId}')`,
											(error) => {
												if (error) reject(error);
												// zwracanie wiadomości
												else {
													resolve(`Dodano użytkownika ${Name}`);
												}
											}
										);
									}
								}
							);
						}
					);
					})
					.catch((error) => {
						reject(error);
					});

				}
			);
		}
	});
}

module.exports = {
	Sres_addNewUser,
};
