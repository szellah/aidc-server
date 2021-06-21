//funckja Sres która pobiera specjalnie stworzony Sres_Promise i odsyła jego wynik.
//pool object - póla połączeń z bazą mysql, z której wydzielane jest połączenie względem zapotrzebowania i możliwości serwera
//res function - funkcja odsyłająca pakiety danych do klienta
//params object - zbiór parametrów w postaci obiektu
function Sres_addNewArticle(pool, res, params) {
    //pobranie funkcji ServerResponse która pozawala na szybkie odesłanie danych
    const { ServerResponse } = require("./ServerResponse");
    //stworzenie Promise, który wykona się po wrzuceniu go do ServerResponse
    const contentCreator = Sres_promise(pool, params);
    //wykoanie ServerResponse a więc również odesłanie gotowych danych w formie pakietów do klienta
    ServerResponse(contentCreator, res);
}

//pobranie póli połączeń oraz rozbicie (dekonstrukcja) parametrów przekazanych przez funkcję Sres
function Sres_promise(
    pool,
    { UserId, article: { Name, Category, LocationId, Description } }
) {
    return new Promise((resolve, reject) => {
        //pobranie funkcji query z mysql
        const { query } = require("mysql");
        // ustawienie daty dodania produktu rrrr-mm-dd hh:mm:ss
        const date = new Date(new Date().setHours(new Date().getHours() + 2))
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        //wysłanie zapytania sql do bazy sql
        if ((!Name || isEmpty(Name)) || (!Category || isEmpty(Category)) || (!LocationId) || (!Description || isEmpty(Description))) {
            let err = {message: "Podano niepoprawne wartosci poszczegolnych pol"};
            return reject(err);
        }
        pool.query(
            `INSERT INTO articles ( LocationId, Category, Name, Description, AddtionDate, State) VALUES ('${LocationId}','${Category}','${Name}','${Description}', '${date.slice(
                0,
                10
            )}', '1')`,
            (error, results) => {
                //prosty handling błędu
                if (error) reject(error);
                // jeżeli nigdzie nie pojawił się błąd to wpis do historii
                else {
                    pool.query(
                        `INSERT INTO history (Action, Time, FirstId, SecondId) VALUES ('2','${date}','${results.insertId}','${UserId}')`,
                        (error) => {
                            if (error) reject(error);
                            // zwracanie wiadomości
                            else resolve(`Dodano nowy artykuł ${Name}`);
                        }
                    );
                }
            }
        );
    });
}


function isEmpty(str) {
    return str.replace(/^\s+|\s+$/gm,'').length == 0;
}


module.exports = {
    Sres_addNewArticle,
};
