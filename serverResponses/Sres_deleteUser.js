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
        // Zapytanie o nazwę użytkownika
        pool.query(
            `SELECT Name FROM accounts WHERE AccountId = ${UserToDelete}`,
            (error, results) => {
                if (error) reject(error);
                else {
                    const name = results[0].Name;
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
                                            resolve(`Usunięto użytkownika ${name}`);
                                    }
                                );
                            }
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
