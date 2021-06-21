/**
 * Pobierz Informacje o lokalizacji<br>
 * Funkcja pobiera Sres_promise i odsyła jego wynik
 * w tym przypadku apropo informacji o lokalizacji 
 * @param {object} pool Pula połączeń z bazą mysql, z której wydzielane jest połączenie względem zapotrzebowania i możliwości serwera
 * @param {function} res Funkcja odsyłająca pakiety danych do klienta
 * @param {number} locationId Id Lokalizacji której informacje mają zostać odesłane
 * 
 * @category Sres
 */
 function Sres_getLocationInfo(pool, res, params){

    const { ServerResponse } = require('./ServerResponse');

    const contentCreator = Sres_promise(pool, params);

    ServerResponse(contentCreator, res);
}

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

