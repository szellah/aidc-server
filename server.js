const express = require('express');
const api = express();
const port = 8080;
const { mysqlpool: globalPool } = require('./mysqlClient/MysqlPool');
const Sres_lib = require('./serverResponses/Sres_lib');

api.use(express.json());
api.use(express.urlencoded({extended: false}));

api.post('/test', (req,res) => {
    Sres_lib.test(globalPool, res, req.body);
});

api.post('/getAccountInfo', (req,res) => {
    Sres_lib.getAccountInfo(globalPool, res, req.body);
});

api.post('/getAccountReport', (req,res) => {
    Sres_lib.getAccountReport(globalPool, res, req.body);
});

api.post("/getArticleInfo", (req, res) => {
    Sres_lib.getArticleInfo(globalPool, res, req.body);
});

api.post("/getNameInfo", (req, res) => {
    Sres_lib.getNameInfo(globalPool, res, req.body);
});

api.post("/testowy", (req, res) => {
    Sres_lib.getNameInfo(globalPool, res, req.body);
});




api.post("/login", (req, res) => {
    Sres_lib.login(globalPool, res, req.body);
});




api.post("/test2", (req, res) => {
    
})

api.listen(port, () => {
    console.log('express start');
});