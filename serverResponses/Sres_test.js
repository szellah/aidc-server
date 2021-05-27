//funckja Sres która pobiera specjalnie stworzony Sres_Promise i odsyła jego wynik.
//pool object - póla połączeń z bazą mysql, z której wydzielane jest połączenie względem zapotrzebowania i możliwości serwera
//res function - funkcja odsyłająca pakiety danych do klienta
//params object - zbiór parametrów w postaci obiektu
function Sres_test(pool, res, params) {
	//pobranie funkcji ServerResponse która pozawala na szybkie odesłanie danych
	const { ServerResponse } = require('./ServerResponse');
	//stworzenie Promise, który wykona się po wrzuceniu go do ServerResponse
	const contentCreator = Sres_promise(pool, params);
	//wykoanie ServerResponse a więc również odesłanie gotowych danych w formie pakietów do klienta
	ServerResponse(contentCreator, res);
}

//pobranie póli połączeń oraz rozbicie (dekonstrukcja) parametrów przekazanych przez funkcję Sres
function Sres_promise(pool, { locationId, historyId, userId }) {
	return new Promise((resolve, reject) => {
		const { query } = require('mysql');

		pool.query(
			`DELETE FROM \`locations\` WHERE LocationId = ${locationId}`,
			(error, results, fields) => {
				if (error) {
					reject(error.message);
				} else {
					console.log(`Usunięto lokalizację o LocationId=${locationId}`);
				}
			}
		);

		pool.query(
			`INSERT INTO \`history\`(\`HistoryId\`, \`Action\`, \`Time\`, \`FirstId\`, \`SecondId\`) VALUES (${historyId}, 6, NOW(), ${locationId}, ${userId})`,
			(error, results, fields) => {
				if (error) {
					reject(error.message);
				} else {
					console.log(results[0]);
					resolve(results);
				}
			}
		);
	});
}

module.exports = {
	Sres_test,
};
