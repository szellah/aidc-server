const {createPool} = require('mysql');

const mysqlpool =  createPool({
    connectionLimit: 10,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'terminarz_baza'
  });



module.exports={
    mysqlpool,
}