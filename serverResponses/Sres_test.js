function Sres_test(pool, res, params){
    Sres_promise(pool, params.id).then((rows) => {
        res.send(rows);
    }).catch((error) => {console.log(error)})
}

function Sres_promise(pool, id){
return new Promise((resolve, reject) => {

const { query } = require('mysql');

pool.query(`SELECT id as AccountId, Imie as Name, Nazwisko as Surname, Login as Email FROM \`uzytkownicy\` `, (error, results, fields) => {
    
    if(error)
    {
        reject(error);
    }
    else
    {
        //console.log(fields);

        let table = results.map((row) => {
            return { id : row.AccountId, fields : [row.Name, row.Surname, row.Email]};
        });
        console.log(table);
        resolve(table);
    }
});

});

}

module.exports={
    Sres_test,
}