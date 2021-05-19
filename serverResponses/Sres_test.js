//funckja Sres która pobiera specjalnie stworzony Sres_Promise i odsyła jego wynik.
//pool object - póla połączeń z bazą mysql, z której wydzielane jest połączenie względem zapotrzebowania i możliwości serwera
//res function - funkcja odsyłająca pakiety danych do klienta
//params object - zbiór parametrów w postaci obiektu
function Sres_test(pool, res, params){
//pobranie funkcji ServerResponse która pozawala na szybkie odesłanie danych
    const {ServerResponse} = require('./ServerResponse');
//stworzenie Promise, który wykona się po wrzuceniu go do ServerResponse
    const contentCreator = Sres_promise(pool, params);
//wykoanie ServerResponse a więc również odesłanie gotowych danych w formie pakietów do klienta
    ServerResponse(contentCreator, res);
}

//pobranie póli połączeń oraz rozbicie (dekonstrukcja) parametrów przekazanych przez funkcję Sres
function Sres_promise(pool, {id}){
return new Promise((resolve, reject) => {
//pobranie funkcji query z mysql
const { query } = require('mysql');
//wysłanie zapytania sql do bazy sql
pool.query(`SELECT AccountId, Name, Surname, Email FROM \`accounts\` WHERE AccountId = ${id} `, (error, results, fields) => {
//prosty handling błędu
    if(error)
        reject(error);
    else//poniżej przykład prymitywnej logiki, mianowicie wyświetlnie pierwszego rekordu z bazy danych, co prawda w waszych zadaniach może znaleźć się zdecydowanie bardziej skomplikowana logika, ważne by funkcja Creq po stronie klienta wiedziała jak wygląda logika i była w stanie taki obiekt wstawić do uprzendio utworzonych elementów UI.
        resolve(results[0]);
    
});

});

}

module.exports={
    Sres_test,
}