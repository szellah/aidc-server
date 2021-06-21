function Sres_getArticleInfo(pool, res, params){

    const { ServerResponse } = require('./ServerResponse');

    const contentCreator = Sres_promise(pool, params);

    ServerResponse(contentCreator, res);
}

function Sres_promise(pool, {articleId}){
return new Promise((resolve, reject) => {

const { query } = require('mysql');

pool.query(`SELECT * FROM \`articles\` WHERE ArticleId = ${articleId}`, (error, results, fields) => {

    if(error)
    {
        reject(error.message);
    }
    else if(!results[0]){
        reject(new Error("nie ma takiego artykułu"));
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