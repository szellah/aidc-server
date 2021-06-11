let SHA256 = require("crypto-js/sha256");


//funckja Sres która pobiera specjalnie stworzony Sres_Promise i odsyła jego wynik.
//pool object - póla połączeń z bazą mysql, z której wydzielane jest połączenie względem zapotrzebowania i możliwości serwera
//res function - funkcja odsyłająca pakiety danych do klienta
//params object - zbiór parametrów w postaci obiektu
/**
 *
 * Funckja Sres_changeAccountPasword która pobiera specjalnie stworzony Sres_Promise i odsyła jego wynik.<br>
 * 
 * @param {object} pool - póla połączeń z bazą mysql, z której wydzielane jest połączenie względem zapotrzebowania i możliwości serwera.
 * @param {res} function -funkcja odsyłająca pakiety danych do klienta.
 * @param {object} params - zbiór parametrów w postaci obiektu.
 *
 */
function Sres_changeAccountPasword(pool, res, params) {
	//pobranie funkcji ServerResponse która pozawala na szybkie odesłanie danych
	const { ServerResponse } = require('./ServerResponse');
	//stworzenie Promise, który wykona się po wrzuceniu go do ServerResponse
	const contentCreator = Sres_promise(pool, params);
	//wykoanie ServerResponse a więc również odesłanie gotowych danych w formie pakietów do klienta
	ServerResponse(contentCreator, res);
}



//pobranie póli połączeń oraz rozbicie (dekonstrukcja) parametrów przekazanych przez funkcję Sres

/**
 *
 * Funckja Sres_promise która pobiera pulę połączeń oraz rozbija (dekonstrukcja) parametry przekazane przez funkcję Sres_changeAccountPasword.<br>

 * 
 * @param {object} pool - póla połączeń z bazą mysql, z której wydzielane jest połączenie względem zapotrzebowania i możliwości serwera.
 * @param {object} { userId, password } - zbiór parametrów w postaci obiektu.
 *
 * @returns {Promise} - zwraca informację o zakończeniu operacji asynchronicznej.
 *
 */

function Sres_promise(pool, { userId, password }) {

	return new Promise((resolve, reject) => {
		const { query } = require('mysql');

        pool.query(
			`UPDATE accounts SET Password="${SHA256(password)}" WHERE AccountId = ${userId}`,
			(error, results, fields) => {
				if (error) {
					reject(error.message);
				} else {
                    resolve(`Zmieniono haslo`);
				}
			}
		);

	});
}

module.exports = {
	Sres_changeAccountPasword,
};
