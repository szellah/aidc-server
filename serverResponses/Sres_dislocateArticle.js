//funckja Sres która pobiera specjalnie stworzony Sres_Promise i odsyła jego wynik.
//pool object - póla połączeń z bazą mysql, z której wydzielane jest połączenie względem zapotrzebowania i możliwości serwera
//res function - funkcja odsyłająca pakiety danych do klienta
//params object - zbiór parametrów w postaci obiektu
/**
 * Odtowarowanie artykułu<br>
 * Funckja Sres która pobiera specjalnie stworzony Sres_Promise i odsyła jego wynik.
 * @function Sres_dislocateArticle
 * @param {object} pool Pula połączeń z bazą mysql, z której wydzielane jest połączenie względem zapotrzebowania i możliwości serwera
 * @param {function} res Funkcja odsyłająca pakiety danych do klienta
 * @param {number} ArticleId Id odtwowarowanego towaru, następnie zostaje dodany do historii
 * @param {number} AccountId Id użytkownika oddtowarujacego towar, następnie zostaje dodany do historii
 * 
 * @category Sres
 */
function Sres_dislocateArticle(pool, res, params) {
    //pobranie funkcji ServerResponse która pozawala na szybkie odesłanie danych
    const { ServerResponse } = require("./ServerResponse");
    //stworzenie Promise, który wykona się po wrzuceniu go do ServerResponse
    const contentCreator = Sres_promise(pool, params);
    //wykoanie ServerResponse a więc również odesłanie gotowych danych w formie pakietów do klienta
    ServerResponse(contentCreator, res);
}


function Sres_promise(pool, { ArticleId, AccountId }) {
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
        if ((!ArticleId) || (!AccountId) ) {
            let err = {message: "Podano niewłaściwe dane"};
            return reject(err);
        }
        pool.query(
            `SELECT ArticleId FROM articles WHERE ArticleId = ${ArticleId}`,
            (error, results) =>{
                if(results.length==0)
                {
                    reject(new Error("błędnie podane dane"));
                }

                else{
                    pool.query(
            `SELECT Name FROM articles WHERE ArticleId = ${ArticleId}`,
            (error, results) => {
                if (error) 
                {
                    error.message="Podano niewłaściwe dane";
                    reject(error);
                }                
                else {
                    const name = results[0].Name;
                    // pobranie inventoryId z bazy
                    pool.query(
                        `SELECT InventoryId FROM accounts WHERE AccountId = ${AccountId}`,
                        (error, results) => {
                            const inventoryId = results[0].InventoryId;
                            if (error) reject(error);
                            else {
                                // Aktualizacja lokacji artykułu w bazie danych
                                pool.query(
                                    `UPDATE articles SET LocationId = '${inventoryId}' WHERE ArticleId = ${ArticleId}`,
                                    (error) => {
                                        //prosty handling błędu
                                        if (error) reject(error);
                                        else {
                                            // jeżeli nigdzie nie pojawił się błąd to wpis do historii
                                            pool.query(
                                                `INSERT INTO history (Action, Time, FirstId, SecondId) VALUES ('1','${date}','${ArticleId}','${inventoryId}')`,
                                                (error) => {
                                                    if (error) reject(error);
                                                    // zwracanie wiadomości
                                                    else
                                                        resolve(
                                                            `Odtowarowano ${name}`
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
            }
        );
    }
            });
        
    });


}

module.exports = {
    Sres_dislocateArticle,
};
