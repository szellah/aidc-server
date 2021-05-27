const express = require('express');
const api = express();
const port = 8080;
const { mysqlpool: globalPool } = require('./mysqlClient/MysqlPool');
const Sres_lib = require('./serverResponses/Sres_lib');

api.use(express.json());
api.use(express.urlencoded({ extended: false }));

api.post('/test', (req, res) => {
	Sres_lib.test(globalPool, res, req.body);
});

api.post('/getAccountInfo', (req, res) => {
	Sres_lib.getAccountInfo(globalPool, res, req.body);
});

api.post('/getAccountReport', (req, res) => {
	Sres_lib.getAccountReport(globalPool, res, req.body);
});

api.post('/getLocationInfo', (req, res) => {
	Sres_lib.getLocationInfo(globalPool, res, req.body);
});

api.post('/addNewLocation', (req, res) => {
	Sres_lib.addNewLocation(globalPool, res, req.body);
});

api.post('/updateLocation', (req, res) => {
	Sres_lib.updateLocation(globalPool, res, req.body);
});

api.post('/deleteLocation', (req, res) => {
	Sres_lib.deleteLocation(globalPool, res, req.body);
});

api.listen(port, () => {
	console.log('express start');
});
