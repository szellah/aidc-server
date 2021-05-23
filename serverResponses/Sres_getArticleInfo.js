function Sres_promise(pool) {
    return new Promise((resolve, reject) => {
        const {query} = require("mysql");
        pool.query(`SELECT * FROM articles WHERE Category = '${"klawiatura"}'`, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                console.log(results[0]);
                resolve(results);
            }
        });
    });
}



function Sres_getArticleInfo(pool, res, params) {
    Sres_promise(pool).then((rows) => {
        res.send(rows[0]);
    }).catch((error) => {console.log(error)})
}


module.exports = {
    Sres_getArticleInfo,
}







