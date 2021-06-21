//funckja Sres która pobiera specjalnie stworzony Sres_Promise i odsyła jego wynik.
//pool object - póla połączeń z bazą mysql, z której wydzielane jest połączenie względem zapotrzebowania i możliwości serwera
//res function - funkcja odsyłająca pakiety danych do klienta
//params object - zbiór parametrów w postaci obiektu
/**
 * Edycja towaru<br>
 * Pobiera specjalnie stworzony Sres_Promise i odsyła jego wynik.
 * @function Sres_updateArticleInfo
 * @param {object} pool  Pula połączeń z bazą mysql, z której wydzielane jest połączenie względem zapotrzebowania i możliwości serwera
 * @param {function} res Funkcja odsyłająca pakiety danych do klienta
 * @param {number} UserId  Id użytkownika edytującego towar, następnie zostaje dodany do historii
 * @param {number} ArticleId Id edytowanego towaru, następnie zostaje dodany do historii
 * @param {string} Name  Nazwa edytowanego towaru
 * @param {string} category  Kategoria edytowanego towaru
 * @param {number} location  Id lokalizacji edytowanego towaru
 * @param {string} description  Opis edytowanego towaru
 * 
 * @category Sres
 */
function Sres_updateArticleInfo(pool, res, params) {
    //pobranie funkcji ServerResponse która pozawala na szybkie odesłanie danych
    const { ServerResponse } = require("./ServerResponse");
    //stworzenie Promise, który wykona się po wrzuceniu go do ServerResponse
    const contentCreator = Sres_promise(pool, params);
    //wykoanie ServerResponse a więc również odesłanie gotowych danych w formie pakietów do klienta
    ServerResponse(contentCreator, res);
}


function Sres_promise(
    pool,
    { UserId, article: { ArticleId, Name, Category, LocationId, Description } }
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
        if ((!ArticleId) || (!Name || isEmpty(Name)) || (!Category || isEmpty(Category)) || (!LocationId) ) {
            let err = {message: "Podano niepoprawne wartosci podczas edycji"};
            return reject(err);
        }
        pool.query(
            `UPDATE articles SET LocationId = '${LocationId}', Category = '${Category}', Name = '${Name}', Description = '${Description}' WHERE ArticleId = ${ArticleId}`,
            (error, results) => {
                //prosty handling błędu
                if (error)
                {   error.message="Podano niepoprawne wartosci podczas edycji";
                    reject(error);
                }
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


function isEmpty(str) {
    return str.replace(/^\s+|\s+$/gm,'').length == 0;
}


module.exports = {
    Sres_updateArticleInfo,
};
