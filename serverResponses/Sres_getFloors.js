/**
 * Funkcja odpowiedzialna za zwrócenie piętra danego budynku
 * Po jej użyciu do aplikacji zostanie odesłany wynik tej funkcji do ServerResponse<br>
 * @function Sres_getFloors
 * @param {object} pool - Pula połączeń z bazą danych mySQL, zarządza połączeniami z serwerem
 * @param {function} res - Funkcja odsyłająca pakiety danych do klienta
 * @param {object} params - Zbiór parametrów
 */
function Sres_getFloors(pool, res, params){

    const { ServerResponse } = require('./ServerResponse');

    const contentCreator = Sres_promise(pool, params);

    ServerResponse(contentCreator, res);
}
/**
 * Funkcja, która pobiera pulę połączeń i rozbija argument params przekazany przez funkcję Sres
 * @function Sres_promise
 * @param {object} pool - Pula połączeń z baża danych mySQL, zarządza połączeniami z serwerem
 * @param {object} params - Rozbity argument params building
 */
function Sres_promise(pool, {building}){
return new Promise((resolve, reject) => {

const { query } = require('mysql');

pool.query(`SELECT DISTINCT Floor FROM \`locations\`WHERE Building = ${building}`, (error, results, fields) => {

    if(error)
    {
        reject(error.message);
    }
    else
    {
        let i = 0;
        const floors = results.map((row) => {
            return {name: row.Floor === 1 ?  'parter': `piętro ${row.Floor-1}`, value: row.Floor.toString(), id: i++};
        })
        resolve(floors);
    }
});

});

}

module.exports={
    Sres_getFloors,
}