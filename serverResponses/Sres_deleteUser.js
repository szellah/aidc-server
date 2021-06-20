function Sres_deleteUser(pool, res, params) {
    const { ServerResponse } = require("./ServerResponse");
    const contentCreator = Sres_promise(pool, params);
    ServerResponse(contentCreator, res);
}
//Usertodelete=Id użytkownika do usunięcia
function Sres_promise(pool, { UserId, UserToDelete }) {
    return new Promise((resolve, reject) => {
        const { query } = require("mysql");
        // ustawienie daty dodania produktu rrrr-mm-dd hh:mm:ss
        const date = new Date(new Date().setHours(new Date().getHours() + 2))
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        //wysłanie zapytania sql do bazy sql

        // Zapytanie o nazwę i id inwentarzy użytkownika
        pool.query(
            `SELECT Name, InventoryId, PersonalUseId FROM accounts WHERE AccountId = ${UserToDelete}`,
            (error, results) => {
                if (error) reject(error);
                else {
                    const name = results[0].Name;
                    const inventoryId = results[0].InventoryId;
                    const personalUseId = results[0].PersonalUseId;

                    // zapytanie o ilość przedmiotów z lokacjami o podanych id
                    pool.query(
                        `SELECT articles.LocationId AS locationId, COUNT(*) AS storedArticles FROM articles WHERE articles.LocationId = ${inventoryId}
                    UNION
                    SELECT articles.LocationId AS locationId, COUNT(*) AS storedArticles FROM articles WHERE articles.LocationId = ${personalUseId}`,
                        (error, results) => {
                            msg =
                                "Nie można usunąć użytkownika. Użytkownik ma przypisane przedmioty:";

                            //prosty handling błędu
                            if (error) reject(error);

                            // zawsze coś będzie w tablicy.
                            if (results[0].storedArticles !== 0) {
                                msg += ` inwentarz - ${results[0].storedArticles};`;
                            }
                            if (
                                results.length > 1 &&
                                results[1].storedArticles !== 0
                            ) {
                                msg += ` własny użytek - ${results[1].storedArticles}`;
                            }
                            // Jeżeli jest tylko 1 element w tablicy i ilość przedmiotów o tym id jest równa 0 to znaczy, że użytkownik nie ma żadnego przedmiotu
                            if (
                                !(
                                    results.length === 1 &&
                                    results[0].storedArticles === 0
                                )
                            ) {
                                // zwrócenie błędu o zatrzymanych przedmiotach przez użytkownika
                                return reject({ message: msg });
                            }

                            // Usunięcie z bazy danych użytkownika
                            pool.query(
                                `DELETE FROM accounts WHERE AccountId = ${UserToDelete}`,
                                (error) => {
                                    //prosty handling błędu
                                    if (error) reject(error);
                                    // jeżeli nigdzie nie pojawił się błąd to wpis do historii
                                    else {
                                        pool.query(
                                            `INSERT INTO history (Action, Time, FirstId, SecondId) VALUES ('9','${date}','${UserToDelete}','${UserId}')`,
                                            (error) => {
                                                if (error) reject(error);
                                                // zwracanie wiadomości
                                                else
                                                    resolve(
                                                        `Usunięto użytkownika ${name}`
                                                    );
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    );
                }
            }
        );
    });
}

module.exports = {
    Sres_deleteUser,
};
