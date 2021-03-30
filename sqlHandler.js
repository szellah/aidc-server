function SqlHandler(id){

return new Promise((resolve, reject) => {

const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit: 10,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'c_sharp'
  });



pool.query(`SELECT * FROM klienci WHERE id = ${id}`, (error, results, fields) => {
    
    if(error)
    {
        reject('error')
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
    SqlHandler: SqlHandler,
}