const config = require("../config");
const jwt = require("jsonwebtoken");


function Sres_login(pool, res, params) {
    const {ServerResponse} = require("./ServerResponse");
    const contentCreator = Sres_promise(pool, params);
    ServerResponse(contentCreator, res);
}



function Sres_promise(pool, {username, password}) {
    return new Promise((resolve, reject) => {
        const {query} = require("mysql");

        pool.query(`SELECT * FROM accounts WHERE Login = '${username}' AND Password = '${password}'`, (error, results) => {
            if (error) {
                reject(error.message);
            }
            if (results.length === 0) {
                reject("Niepoprawny login lub haslo");
            }
            else {
                // Tutaj byc moze wpis do historii, ale nie znalazlem jak ma wygladac
                // pool.query(``)
                console.log(results);
                console.log(results.length);
                // exp to czas wygaszenia tokena, ale i tak zrobilem to inaczej w Login.js, nie ma on znaczenia ale najlepiej zostawic jakas duza wartosc
                // config.secret to sekret dla tokena, jest w pliku config.js
                let token = jwt.sign({username: username, exp: Math.floor(Date.now() / 1000) + (600 * 600)}, config.secret);
                results[0].token = token;
                console.log(results);
                resolve(results);
            }
        });
    });
}


module.exports = {
    Sres_login,
}




















