const {createPool} = require('mysql');

const mysqlpool =  createPool({
    connectionLimit: 10,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'aidc_db'
  });



module.exports={
    mysqlpool,
}