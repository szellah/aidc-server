/**
 * Funkcja pobiera Sres_promise i odsyła jego wynik
 * w tym przypadku apropo informacji o koncie 
 * @param {var} pool    - połączenie z bazą danych  
 * @param {var} res     - funkcja odsyłająca pakiety danych do klienta
 * @param {var} params  - parametry Konta
 */
 function Sres_getAccountInfo(pool, res, params){

    const { ServerResponse } = require('./ServerResponse');

    const contentCreator = Sres_promise(pool, params);

    ServerResponse(contentCreator, res);
}

/**
 * Funkcja wysyła zapytanie do servera o informacje apropo Konta o podanym ID
 * pobiera pulę połączeń oraz rozbija(dekonstrukcja) parametry przekazane przez funkcję Sres
 * @param {var} pool       -połączenie z bazą danych
 * @param {var} accountId  -ID Konta
 * @returns zwraca informacje o danym Koncie albo error
 */
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

