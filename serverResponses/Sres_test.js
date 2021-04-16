function Sres_test(pool, res, params){
    Sres_promise(pool, params.id).then((rows) => {
        res.send(rows);
    }).catch((error) => {console.log(error)})
}

function Sres_promise(pool, id){
return new Promise((resolve, reject) => {

const { query } = require('mysql');

pool.query(`SELECT AccountId, Name, Surname, Email FROM \`accounts\` `, (error, results, fields) => {
    
    let notification;

    if(error)
    {
        notification = { error: true, message : error };
    }
    else
    {
        notification = { error: false, message :  "hej udało się"};
    }
    console.log(notification);
    resolve(notification);
});

});

}

module.exports={
    Sres_test,
}