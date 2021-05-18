function Sres_test(pool, res, params){

    let content = {error: null, message: null};

    Sres_promise(pool, params.id)
    .then((message) => 
    {
        content.error = false;
        content.message = message;
    })
    .catch((error) => { 
        content.error = true;
        content.message = error;
    })
    .finally(() => {
        res.send(content);
    })
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