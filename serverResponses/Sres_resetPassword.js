/**
 * Funkcja odpowiedzialna za zresetowanie hasła
 * Po jej użyciu do aplikacji zostanie odesłany wynik tej funkcji do ServerResponse<br>
 * @function Sres_resetPassword
 * @param {object} pool - Pula połączeń z bazą danych mySQL, zarządza połączeniami z serwerem
 * @param {function} res - Funkcja odsyłająca pakiety danych do klienta
 * @param {object} params - Zbiór parametrów
 */
function Sres_resetPassword(pool, res, params) {
	const { ServerResponse } = require('./ServerResponse');

	const contentCreator = Sres_promise(pool, params);

	ServerResponse(contentCreator, res);
}
/**
 * Funkcja, która pobiera pulę połączeń i rozbija argument params przekazany przez funkcję Sres
 * @function Sres_promise
 * @param {object} pool - Pula połączeń z baża danych mySQL, zarządza połączeniami z serwerem
 * @param {object} params - Rozbity argument params na UserId
 */
function Sres_promise(pool, { UserId }) {
	return new Promise((resolve, reject) => {
		const { query } = require('mysql');
        const SHA256 = require('crypto-js/sha256');
        const {passwordGenerator} = require('../handlers/passwordGenerator');
        const { mailSender } = require('../handlers/mailSender');


        const password = passwordGenerator();
        const encryptedPassword = SHA256(password).toString();

		pool.query(
			`UPDATE accounts SET Password="${encryptedPassword}" WHERE AccountId = ${UserId}`,
			(error, results, fields) => {
				if (error) {
					reject(error);
				} else {
                    pool.query(
                        `SELECT Login, Email FROM accounts WHERE AccountId = ${UserId}`,
                        (error, results, fields) => {
                            if (error) {
                                reject(error);
                            } else {
                                mailSender(results[0].Email, 'AIDC: Zmiana hasła', `Witaj ${results[0].Login}\nTwoje hasło zostało zmienione na ${password}`)
                                .then((message)=>{
                                    resolve(message)
                                })
                                .catch((error) => {
                                    reject(error);
                                })
                            }
                        }
                    );
				}
			}
		);

		
	});
}

module.exports = {
	Sres_resetPassword,
    setupPassword: Sres_promise,
};
