function Sres_promise(pool) {
    return new Promise((resolve, reject) => {
        const {query} = require("mysql");
        pool.query(`INSERT INTO articles VALUES (100, 100)`, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                console.log[results[0]];
                resolve(results);
            }
        });
    });
}



function Sres_getNameInfo(pool, res, params) {
    Sres_promise(pool).then((rows) => {
        res.send(rows);
    }).catch((error) => {console.log(error)});
}


module.exports = {
    Sres_getNameInfo,
}
















