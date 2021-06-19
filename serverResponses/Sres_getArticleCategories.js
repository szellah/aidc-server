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