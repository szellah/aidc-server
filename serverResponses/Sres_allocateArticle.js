//funckja Sres która pobiera specjalnie stworzony Sres_Promise i odsyła jego wynik.
//pool object - póla połączeń z bazą mysql, z której wydzielane jest połączenie względem zapotrzebowania i możliwości serwera
//res function - funkcja odsyłająca pakiety danych do klienta
//params object - zbiór parametrów w postaci obiektu
/** 
 * Pobiera specjalnie stworzony Sres_Promise i odsyła jego wynik
 * @function Sres_allocateArticle 
 * @param {object} pool pula połączeń z bazą mysql, z której wydzielane jest połączenie względem zapotrzebowania i możliwości serwera
 * @param {function} res Funkcja odsyłająca pakiety danych do klienta
 * @param {object} params Zbiór parametrów w postaci obiektu
 */
function Sres_allocateArticle(pool, res, params) {
    //pobranie funkcji ServerResponse która pozawala na szybkie odesłanie danych
    const { ServerResponse } = require("./ServerResponse");
    //stworzenie Promise, który wykona się po wrzuceniu go do ServerResponse
    const contentCreator = Sres_promise(pool, params);
    //wykoanie ServerResponse a więc również odesłanie gotowych danych w formie pakietów do klienta
    ServerResponse(contentCreator, res);
}

/**
 * Pobranie puli połączeń oraz rozbicie (dekonstrukcja) parametrów przekazanych przez funkcję Sres
 * @function Sres_promise 
 * @param {object} pool Pula połączeń z bazą mysql, z której wydzielane jest połączenie względem zapotrzebowania i możliwości serwera

 * @returns 
 */
//pobranie póli połączeń oraz rozbicie (dekonstrukcja) parametrów przekazanych przez funkcję Sres
function Sres_promise(pool, { ArticleId, LocationId }) {
    return new Promise((resolve, reject) => {
        //pobranie funkcji query z mysql
        const { query } = require("mysql");
        // ustawienie daty dodania produktu rrrr-mm-dd hh:mm:ss
        const date = new Date(new Date().setHours(new Date().getHours() + 2))
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        //wysłanie zapytania sql do bazy sql
        // Zapytanie o nazwę artykułu
        if ((!ArticleId) || (!LocationId) ) {
            let err = {message: "Podano niewłaściwe dane"};
            return reject(err);
        }
        pool.query(`SELECT ArticleId FROM articles WHERE ArticleId = ${ArticleId}`, (error, results, fields) => {
            if(results.length==0)
            {
                reject(new Error("błędznie podane dane"));
            }else
            {
                pool.query(`SELECT LocationId FROM locations WHERE LocationId = ${LocationId}`, (error, results, fields) => {
                    if(results.length==0)
                    {
                     reject(new Error("błędznie podane dane"));
                    }else
                    {
                       pool.query(
            `SELECT Name FROM articles WHERE ArticleId = ${ArticleId}`,
            (error, results) => {
                if (error) reject(error);
                else {
                    const name = results[0].Name;
                    // Aktualizacja lokacji artykułu w bazie danych
                    pool.query(
                        `UPDATE articles SET LocationId = '${LocationId}' WHERE ArticleId = ${ArticleId}`,
                        (error) => {
                            //prosty handling błędu
                            if (error) reject(error);
                            else {
                                // zapytanie o lokalizacje(Budynek, piętro, pokój)
                                pool.query(
                                    `SELECT * FROM locations WHERE LocationId = ${LocationId}`,
                                    (error, results) => {
                                        if (error) reject(error);
                                        // jeżeli nigdzie nie pojawił się błąd to wpis do historii
                                        else
                                            pool.query(
                                                `INSERT INTO history (Action, Time, FirstId, SecondId) VALUES ('1','${date}','${ArticleId}','${LocationId}')`,
                                                (error) => {
                                                    if (error) reject(error);
                                                    // zwracanie wiadomości
                                                    else
                                                        resolve(
                                                            `Dotowarowano ${name} do ${results[0].Building} ${results[0].Floor}/${results[0].Room}`
                                                        );
                                                }
                                            );
                                    }
                                );
                            }
                        }
                    );
                }
            }
        ); 
                    }
                });
            }
           
        });
        
    });
}

module.exports = {
    Sres_allocateArticle,
};
