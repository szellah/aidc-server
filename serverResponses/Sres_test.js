function Sres_test(pool, res, params){

    const {ServerResponse} = require('./ServerResponse');
    const contentCreator = Sres_promise(pool, params.id);
    ServerResponse(contentCreator, res);
}

function Sres_promise(pool, id){
return new Promise((resolve, reject) => {

const { query } = require('mysql');

pool.query(`SELECT AccountId, Name, Surname, Email FROM \`accounts\` WHERE AccountId = ${id} `, (error, results, fields) => {

    if(error)
        reject(error);
    else
        resolve(results[0]);
    
});

});

}

module.exports={
    Sres_test,
}