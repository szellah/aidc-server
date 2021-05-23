function Sres_login(pool, res, params) {
    Sres_promise(pool, params.username, params.password).then((rows) => {
        res.send(rows);
    })
    .catch(error => console.log(error));
}



function Sres_promise(pool, username, password) {
    return new Promise((resolve, reject) => {
        const {query} = require("mysql");

        pool.query(`SELECT * FROM accounts WHERE Login = '${username}' AND Password = '${password}'`, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                console.log(results);
                resolve(results);
            }
        });
    });
}


module.exports = {
    Sres_login,
}




















