/**
 * Dodanie nowej lokalizacji<br>
 * Funkcja odpowiedzialna za dodanie nowej lokacji<br>
 * Po jej użyciu do aplikacji zostanie odesłany wynik tej funkcji do ServerResponse<br>
 * @function Sres_addNewLocation
 * @param {object} pool - Pula połączeń z bazą danych mySQL, zarządza połączeniami z serwerem
 * @param {function} res - Funkcja odsyłająca pakiety danych do klienta
 * @param {number} building - numer budynku w którym znajduje się lokalizacja
 * @param {number} floor - numer piętra w danym budynku na którym znajduje się lokalizacja
 * @param {number} room - numer pokoju na danym pietrze w danym budynku w którym znajduje się lokalizacja
 * 
 * @category Sres
 * 
 */
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
			`SELECT * FROM \`locations\` WHERE \`Building\` = ${building} AND \`Floor\` = ${floor} AND \`Room\` =  ${room}`,
			(error, results, fields) => {
				if (error) {
					reject(error.message);
				} else {
					if(results.length == 0)
					{
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
					}
					else
					{
						error = {message: "Ta lokalizacja już istnieje", text: "Ta lokalizacja już istnieje"};
						reject(error.message);
					}	
				}
			}
		);

		
	});
}

module.exports = {
	Sres_addNewLocation,
};
