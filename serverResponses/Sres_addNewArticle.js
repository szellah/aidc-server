
/**
 * Pobiera specjalnie stworzony Sres_Promise i odsyła jego wynik
 * @function Sres_addNewArticle 
 * @param {object} pool Pula połączeń z bazą mysql, z której wydzielane jest połączenie względem zapotrzebowania i możliwości serwera
 * @param {function} res Funkcja odsyłająca pakiety danych do klienta.
 * @param {object} params Zbiór parametrów w postaci obiektu.
 * @property {object} ServerResponse Pobranie funkcji ServerResponse która pozawala na szybkie odesłanie danych
 */

function Sres_addNewArticle(pool, res, params) {
    
    const { ServerResponse } = require("./ServerResponse");
    //stworzenie Promise, który wykona się po wrzuceniu go do ServerResponse
    const contentCreator = Sres_promise(pool, params);
    //wykoanie ServerResponse a więc również odesłanie gotowych danych w formie pakietów do klienta
    ServerResponse(contentCreator, res);
}
/**
 * Pobranie póli połączeń oraz rozbicie (dekonstrukcja) parametrów przekazanych przez funkcję Sres
 * @function Sres_promise 
 * @param {*} pool  Pula połączeń z bazą mysql, z której wydzielane jest połączenie względem zapotrzebowania i możliwości serwera

 * @returns 
 */

function Sres_promise(
    pool,
    { UserId, article: { Name, category, location, description } }
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
        pool.query(
            `INSERT INTO articles ( LocationId, Category, Name, Description, AddtionDate, State) VALUES ('${location}','${category}','${Name}','${description}', '${date.slice(
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

module.exports = {
    Sres_addNewArticle,
};
