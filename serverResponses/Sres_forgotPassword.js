const { ConsoleWriter } = require('istanbul-lib-report');
/**
 * Funkcja odpowiedzialna za wysłanie nowego hasła na skrzynke mailową danego użytkownika.
 * Po jej użyciu do aplikacji zostanie odesłany wynik tej funkcji do ServerResponse<br>
 * @function Sres_forgotPassword
 * @param {object} pool - Pula połączeń z bazą danych mySQL, zarządza połączeniami z serwerem
 * @param {function} res - Funkcja odsyłająca pakiety danych do klienta
 * @param {object} params - Zbiór parametrów Login
 * 
 * @category Sres
 */
function Sres_forgotPassword(pool, res, params){

    const { ServerResponse } = require('./ServerResponse');

    const contentCreator = Sres_promise(pool, params);

    ServerResponse(contentCreator, res);
}

function Sres_promise(pool, {Login}){
return new Promise((resolve, reject) => {

pool.query(`SELECT AccountId, Name, Surname, Login, Email, Rank, State FROM accounts WHERE Login = "${Login}"`, (error, results, fields) => {
    
    if(error)
    {
        reject(error);
    }
    else if(results.length==1)
    {
        const { setupPassword } = require("./Sres_resetPassword");
        setupPassword(pool, { UserId: results[0].AccountId})
					.then((message) => {
                        resolve(message);
                    })
                    .catch((error) => {
                        reject(error);
                    });
    }
    else
    {
        reject(new Error("nie ma takiego użytkownika"));
    }
});

});

}
	

module.exports = {
	Sres_forgotPassword,

};

