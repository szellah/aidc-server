const express = require('express');
const api = express();
const port = 8080;
const { mysqlpool: globalPool } = require('./mysqlClient/MysqlPool');
const Sres_lib = require('./serverResponses/Sres_lib');

api.use(express.json());
api.use(express.urlencoded({extended: false}));

api.post('/', (req,res) => {
    Sres_lib.test(globalPool, res, req.body);
});

api.listen(port, () => {
    console.log('express start');
});