const {createPool} = require('mysql');

const pool =  createPool({
    connectionLimit: 10,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'c_sharp'
  });



module.exports={
    pool,
}