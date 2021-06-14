/**
 * Funkcja pobiera Sres_promise i odsyła jego wynik
 * w tym przypadku apropo informacji o lokalizacji 
 * @param {var} pool    - połączenie z bazą danych  
 * @param {var} res     - funkcja odsyłająca pakiety danych do klienta
 * @param {var} params  - parametry Lokalizacji
 */
 function Sres_getLocationInfo(pool, res, params){

    const { ServerResponse } = require('./ServerResponse');

    const contentCreator = Sres_promise(pool, params);

    ServerResponse(contentCreator, res);
}
/**
 * Funkcja wysyła zapytanie do servera o informacje apropo Lokalizacji o podanym ID
 * pobiera pulę połączeń oraz rozbija(dekonstrukcja) parametry przekazane przez funkcję Sres
 * @param {var} pool        -połączenie z bazą danych
 * @param {var} locationId  -ID lokalizacji
 * @returns zwraca informacje o danej lokalizacji albo error
 */
function Sres_promise(pool, {locationId}){
return new Promise((resolve, reject) => {

const { query } = require('mysql');

pool.query(`SELECT * FROM \`locations\` WHERE LocationId = ${locationId}`, (error, results, fields) => {
    
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

module.exports={
    Sres_getLocationInfo,
}

