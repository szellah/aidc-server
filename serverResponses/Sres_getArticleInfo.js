/**
 * Funkcja pobiera Sres_promise i odsyła jego wynik
 * w tym przypadku apropo informacji o artykule
 * @param {var} pool    - połączenie z bazą danych  
 * @param {var} res     - funkcja odsyłająca pakiety danych do klienta
 * @param {var} params  - parametry Artykułu
 */
 function Sres_getArticleInfo(pool, res, params){

    const { ServerResponse } = require('./ServerResponse');

    const contentCreator = Sres_promise(pool, params);

    ServerResponse(contentCreator, res);
}
/**
 * Funkcja wysyła zapytanie do servera o informacje apropo Artykułu o podanym ID
 * pobiera pulę połączeń oraz rozbija(dekonstrukcja) parametry przekazane przez funkcję Sres
 * @param {*} pool      -połączenie z bazą danych
 * @param {*} articleId -ID artykułu
 * @returns zwraca informacje o danym artykule albo error
 */
function Sres_promise(pool, {articleId}){
return new Promise((resolve, reject) => {

const { query } = require('mysql');

pool.query(`SELECT * FROM \`articles\` WHERE ArticleId = ${articleId}`, (error, results, fields) => {

    if(error)
    {
        reject(error.message);
    }
    else
    {
        resolve(results[0]);
    }
});

});

}

module.exports={
    Sres_getArticleInfo,
}