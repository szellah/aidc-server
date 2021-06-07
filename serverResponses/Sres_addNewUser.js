///ok
function Sres_addNewUser(pool, res, params) {
    const { ServerResponse } = require("./ServerResponse");
    const contentCreator = Sres_promise(pool, params);
    ServerResponse(contentCreator, res);
}

function Sres_promise(
    pool,
    { UserId, User: { name, surname, login, password, email,rank, state, inventoryid,personaluseid } }
) {
    return new Promise((resolve, reject) => {
        //pobranie funkcji query z mysql
        const { query } = require("mysql");
       // ustawienie daty rrrr-mm-dd hh:mm:ss
        const date = new Date(new Date().setHours(new Date().getHours() + 2))
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        //wysłanie zapytania sql do bazy sql
        pool.query(
            `INSERT INTO accounts ( AccountId, Name, Surname, Login, Password, Email, Rank, State, InventoryId, PersonalUseID) VALUES ( NULL ,'${name}','${surname}','${login}','${password}','${email}','${rank}','${state}','${inventoryid}','${personaluseid}')`,
            (error, results) => {
                //prosty handling błędu
                if (error) reject(error);
                // jeżeli nigdzie nie pojawił się błąd to wpis do historii
                else {
                    pool.query(
                        `INSERT INTO history (Action, Time, FirstId, SecondId) VALUES ('8','${date}','${results.insertId}','${UserId}')`,
                        (error) => {
                            if (error) reject(error);
                            // zwracanie wiadomości
                            else resolve(`Dodano użytkownika ${name}`);
                        }
                    );
                }
            }
        );
    });
}

module.exports = {
    Sres_addNewUser,
};