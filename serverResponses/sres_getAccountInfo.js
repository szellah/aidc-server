function sres_getAccountInfo(pool, id){

const { query } = require('mysql');
return new Promise((resolve, reject) => {

pool.query(`SELECT * FROM \`klienci\` WHERE id = ${id}`, (error, results, fields) => {
    
    if(error)
    {
        reject('error');
    }
    else
    {
        console.log(results[0]);
        resolve(results);
    }
});

});

}

module.exports={
    sres_getAccountInfo: sres_getAccountInfo,
}