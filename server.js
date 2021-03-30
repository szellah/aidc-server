const {sres_getAccountInfo} = require('./serverResponses/sres_getAccountInfo');
const express = require('express');
const app = express();
const port = 8080;
const { pool: globalPool } = require('./mysqlClient/mysqlClient')


// const mysql = require('mysql');

// const globalPool = mysql.createPool({
//     connectionLimit: 10,
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'c_sharp'
//   });

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post('/', (req,res) => {
    // console.log(pool);
    sres_getAccountInfo(globalPool, req.body.id).then((rows) => {
        res.send(rows[0]);
    }).catch((error) => {console.log(error)})
});

app.listen(port, () => {
    console.log('express start');
});