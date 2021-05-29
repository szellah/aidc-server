function Sres_getLocalizationInfo(pool, res, params){
    Sres_promise(pool, params.id).then((rows) => {
        res.send(rows[0]);
    }).catch((error) => {console.log(error)})
}

function Sres_promise(pool, id){
return new Promise((resolve, reject) => {

const { query } = require('mysql');

pool.query(`SELECT * FROM \`locations\` WHERE LocationId = ${id}`, (error, results, fields) => {
    
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
    Sres_getLocalizationInfo,
}