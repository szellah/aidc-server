
/**
 * Funkcja odpowiedzialna za zwrócenie wszystkich kategori artykułów 
 * Po jej użyciu do aplikacji zostanie odesłany wynik tej funkcji do ServerResponse<br>
 * @function Sres_getArticleCategorie
 * @param {object} pool - Pula połączeń z bazą danych mySQL, zarządza połączeniami z serwerem
 * @param {function} res - Funkcja odsyłająca pakiety danych do klienta
 * 
 * @category Sres
 */
function Sres_getArticleCategories(pool, res){

    const { ServerResponse } = require('./ServerResponse');

    const contentCreator = Sres_promise(pool);

    ServerResponse(contentCreator, res);
}

function Sres_promise(pool){
return new Promise((resolve, reject) => {

const { query } = require('mysql');

pool.query(`SELECT DISTINCT \`category\` FROM \`articles\``, (error, results, fields) => {

    if(error)
    {
        reject(error.message);
    }
    else
    {
        let i = 0;
        const categories = results.map((row) => {
            return {name: row.category, value: row.category.toString(), id: i++};
        })
        resolve(categories);
    }
});

});

}

module.exports={
    Sres_getArticleCategories,
}