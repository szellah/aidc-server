/**
 * Pobierz Informacje o użytkowniku<br>
 * Funkcja pobiera Sres_promise i odsyła jego wynik
 * w tym przypadku apropo informacji o koncie 
 * @param {object} pool Pula połączeń z bazą mysql, z której wydzielane jest połączenie względem zapotrzebowania i możliwości serwera
 * @param {function} res Funkcja odsyłająca pakiety danych do klienta
 * @param {number} accountId Id użytkownika którego informacje mają zostać odesłane
 */
 function Sres_getAccountInfo(pool, res, params){

    const { ServerResponse } = require('./ServerResponse');

    const contentCreator = Sres_promise(pool, params);

    ServerResponse(contentCreator, res);
}

function Sres_promise(pool, {accountId}){
return new Promise((resolve, reject) => {




pool.query(`SELECT AccountId, Name, Surname, Login, Email, Rank, State FROM accounts WHERE AccountId = ${accountId}`, (error, results, fields) => {
    
    if(error)
    {
        reject(error.message);
    }
    else
    {
        resolve(results[0]);
    }
});

});

}
	

module.exports = {
	Sres_getAccountInfo,

};

