/**
 * Funkcja odpowiedzialna za pobranie wszystkich dostepnych budynków
 * Po jej użyciu do aplikacji zostanie odesłany wynik tej funkcji do ServerResponse<br>
 * @function Sres_getBuildings
 * @param {object} pool - Pula połączeń z bazą danych mySQL, zarządza połączeniami z serwerem
 * @param {function} res - Funkcja odsyłająca pakiety danych do klienta
 */
function Sres_getBuildings(pool, res){

    const { ServerResponse } = require('./ServerResponse');

    const contentCreator = Sres_promise(pool);

    ServerResponse(contentCreator, res);
}
/**
 * Funkcja, która pobiera pulę połączeń i rozbija argument params przekazany przez funkcję Sres
 * @function Sres_promise
 * @param {object} pool - Pula połączeń z baża danych mySQL, zarządza połączeniami z serwerem
 */
function Sres_promise(pool){
return new Promise((resolve, reject) => {

const { query } = require('mysql');

pool.query(`SELECT DISTINCT Building FROM \`locations\` WHERE NOT Building = -1`, (error, results, fields) => {

    if(error)
    {
        reject(error.message);
    }
    else
    {
        let i = 0;
        const buildings = results.map((row) => {
            return {name: `budynek ${row.Building}`, value: row.Building.toString(), id: i++};
        })
        resolve(buildings);
    }
});

});

}

module.exports={
    Sres_getBuildings,
}