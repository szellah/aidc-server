function SqlHandler(id){

return new Promise((resolve, reject) => {

const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'c_sharp'
  });

connection.connect();

connection.query(`SELECT * FROM klienci WHERE id = ${id}`, (error, results, fields) => {
    
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

function InsertHandler(){

    return new Promise((resolve, reject) => {
    
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'c_sharp'
      });
    
    connection.connect();
    
    connection.query("INSERT INTO `klienci` (`id`, `Imie`, `Nazwisko`, `Data`) VALUES (NULL, 'Piotr', 'Nagłowski', '2021-03-10');", (error, results, fields) => {
        
        if(error)
        {
            reject('error')
        }
        else
        {
            resolve('pog');
        }
    });
    
    });
    
}


module.exports={
    SqlHandler: SqlHandler,
    InsertHandler: InsertHandler,
};