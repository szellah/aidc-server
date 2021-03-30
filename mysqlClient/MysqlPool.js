const {createPool} = require('mysql');

const mysqlpool =  createPool({
    connectionLimit: 10,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'c_sharp'
  });



module.exports={
    mysqlpool,
}