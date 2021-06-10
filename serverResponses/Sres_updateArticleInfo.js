//funckja Sres która pobiera specjalnie stworzony Sres_Promise i odsyła jego wynik.
//pool object - póla połączeń z bazą mysql, z której wydzielane jest połączenie względem zapotrzebowania i możliwości serwera
//res function - funkcja odsyłająca pakiety danych do klienta
//params object - zbiór parametrów w postaci obiektu
/**
 * Pobiera specjalnie stworzony Sres_Promise i odsyła jego wynik.
 * @function Sres_updateArticleInfo
 * @param {object} pool  Pula połączeń z bazą mysql, z której wydzielane jest połączenie względem zapotrzebowania i możliwości serwera
 * @param {function} res Funkcja odsyłająca pakiety danych do klienta
 * @param {object} params  Zbiór parametrów w postaci obiektu
 */
function Sres_updateArticleInfo(pool, res, params) {
    //pobranie funkcji ServerResponse która pozawala na szybkie odesłanie danych
    const { ServerResponse } = require("./ServerResponse");
    //stworzenie Promise, który wykona się po wrzuceniu go do ServerResponse
    const contentCreator = Sres_promise(pool, params);
    //wykoanie ServerResponse a więc również odesłanie gotowych danych w formie pakietów do klienta
    ServerResponse(contentCreator, res);
}


/**
 Pobranie póli połączeń oraz rozbicie (dekonstrukcja) parametrów przekazanych przez funkcję Sres
 * @function Sres_promise
 * @param {object} pool  Pula połączeń z bazą mysql, z której wydzielane jest połączenie względem zapotrzebowania i możliwości serwera
 * 
 */
function Sres_promise(
    pool,
    { UserId, article: { ArticleId, Name, category, location, description } }
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
            `UPDATE articles SET LocationId = '${location}', Category = '${category}', Name = '${Name}', Description = '${description}' WHERE ArticleId = ${ArticleId}`,
            (error) => {
                //prosty handling błędu
                if (error) reject(error);
                // jeżeli nigdzie nie pojawił się błąd to wpis do historii
                else {
                    pool.query(
                        `INSERT INTO history (Action, Time, FirstId, SecondId) VALUES ('4','${date}','${ArticleId}','${UserId}')`,
                        (error) => {
                            if (error) reject(error);
                            // zwracanie wiadomości
                            else resolve(`Zmieniono dane artykułu ${Name}`);
                        }
                    );
                }
            }
        );
    });
}

module.exports = {
    Sres_updateArticleInfo,
};
