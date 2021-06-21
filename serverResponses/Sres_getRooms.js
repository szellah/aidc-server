/**
 * Pobiera specjalnie stworzony Sres_getRooms i odsyła jego wynik
 * @function Sres_getRooms
 * @param {object} pool Pula połączeń z bazą mysql, z której wydzielane jest połączenie względem zapotrzebowania i możliwości serwera
 * @param {function} res Funkcja odsyłająca pakiety danych do klienta.
 * @param {object} params Zbiór parametrów w postaci obiektu.
 * @property {object} ServerResponse Pobranie funkcji ServerResponse która pozawala na szybkie odesłanie danych
 */
function Sres_getRooms(pool, res, params){

    const { ServerResponse } = require('./ServerResponse');

    const contentCreator = Sres_promise(pool, params);

    ServerResponse(contentCreator, res);
}
/**
 * Pobranie póli połączeń oraz rozbicie (dekonstrukcja) parametrów przekazanych przez funkcję Sres
 * @function Sres_promise 
 * @param {*} pool  Pula połączeń z bazą mysql, z której wydzielane jest połączenie względem zapotrzebowania i możliwości serwera
 * @returns 
 */
function Sres_promise(pool, {building, floor}){
return new Promise((resolve, reject) => {

const { query } = require('mysql');

pool.query(`SELECT DISTINCT Room FROM \`locations\`WHERE Building = ${building} AND Floor = ${floor}`, (error, results, fields) => {

    if(error)
    {
        reject(error.message);
    }
    else
    {
        let i = 0;
        const rooms = results.map((row) => {
            return {name: `pokój ${row.Room}`, value: row.Room.toString(), id: i++};
        })
        resolve(rooms);
    }
});

});

}

module.exports={
    Sres_getRooms,
}