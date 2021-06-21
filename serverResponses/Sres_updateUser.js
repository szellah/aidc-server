/**
 * Edycja użytkownika<br>
 * odsyła poprzez HTTP informacje o tym czy udało się zmienić dane 
 * użytkownika
 * @function 
 * @param {object} pool Połączenie do bazy danych
 * @param {function} res Funkcja zwracająca informacje poprzez HTTP POST
 * @param {number} UserId Id użytkownika edytującego innego użytkownika, zapisane zostanie jako wpis w historii
 * @param {string} name Imię zmienianego użytkownika
 * @param {string} surname Nazwisko zmienianego użytkownika
 * @param {string} login Login zmienianego użytkownika
 * @param {string} email Email zmienianego użytkownika, potrzebny do wysłania mu wiadomości mailowych w tym wzmienianego hasła
 * @param {number} rank Ranga zmienianego użytkownika, administratorska bądź zwykła
 * @param {number} state Stan zmienianego użytkownika, aktywn bądź nieaktywny
 *  
 * @category Sres
 */
function Sres_updateUser(pool, res, params) {
    const { ServerResponse } = require("./ServerResponse");
    const contentCreator = Sres_promise(pool, params);
    ServerResponse(contentCreator, res);
}

function Sres_promise(
    pool,
    { UserId, User: { accountid, name, surname, login, password, email,rank, state, inventoryid,personaluseid } }
) {
    return new Promise((resolve, reject) => {
        const { query } = require("mysql");
        // ustawienie daty dodania produktu rrrr-mm-dd hh:mm:ss
        const date = new Date(new Date().setHours(new Date().getHours() + 2))
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        //wysłanie zapytania sql do bazy sql
        pool.query(
            `UPDATE accounts SET Name = '${name}', Surname = '${surname}', Login = '${login}', Password = '${password}', Email = '${email}', Rank = '${rank}', State = '${state}', InventoryId = '${inventoryid}', Personaluseid = '${personaluseid}' WHERE AccountId = ${accountid}`,
            (error) => {
                //prosty handling błędu
                if (error) reject(error);
                // jeżeli nigdzie nie pojawił się błąd to wpis do historii
                else {
                    pool.query(
                        `INSERT INTO history (Action, Time, FirstId, SecondId) VALUES ('10','${date}','${accountid}','${UserId}')`,
                        (error) => {
                            if (error) reject(error);
                            // zwracanie wiadomości
                            else resolve(`Zmieniono dane użytkownika ${name}`);
                        }
                    );
                }
            }
        );
    });
}

module.exports = {
    Sres_updateUser,
};