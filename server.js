const express = require("express");
const api = express();
const port = 8080;
const { mysqlpool: globalPool } = require("./mysqlClient/MysqlPool");
const Sres_lib = require("./serverResponses/Sres_lib");

api.use(express.json());
api.use(express.urlencoded({ extended: false }));


api.post('/login', (req, res) => {
	Sres_lib.login(globalPool, res, req.body);
});


api.post('/test', (req, res) => {
	Sres_lib.test(globalPool, res, req.body);
});



api.post('/getAccountInfo', (req, res) => {
	Sres_lib.getAccountInfo(globalPool, res, req.body);
});

api.post('/getAccountReport', (req, res) => {
	Sres_lib.getAccountReport(globalPool, res, req.body);
});


api.post('/getArticleReport', (req, res) => {
	Sres_lib.getArticleReport(globalPool, res, req.body);
});


api.post('/getLocationInfo', (req, res) => {
	Sres_lib.getLocationInfo(globalPool, res, req.body);
});

api.post('/addNewLocation', (req, res) => {
	Sres_lib.addNewLocation(globalPool, res, req.body);
});

api.post('/updateLocationInfo', (req, res) => {
	Sres_lib.updateLocation(globalPool, res, req.body);
});

api.post('/deleteLocation', (req, res) => {
	Sres_lib.deleteLocation(globalPool, res, req.body);
});



  
api.post('/addNewUser', (req,res) => {
	Sres_lib.addNewUser(globalPool, res, req.body);
});

api.post('/deleteUser', (req,res) => {
	Sres_lib.deleteUser(globalPool, res, req.body);
});

api.post('/updateUserInfo', (req,res) => {
	Sres_lib.updateUser(globalPool, res, req.body);
});
  



api.post('/test', (req, res) => {
	Sres_lib.test(globalPool, res, req.body);
});


  
api.post('/changeAccountPassword', (req, res) => {
	Sres_lib.changeAccountPasword(globalPool, res, req.body);
});
  
  
  
  


api.post('/getArticleInfo', (req,res) => {
    Sres_lib.getArticleInfo(globalPool, res, req.body);
});


api.post("/addNewArticle", (req, res) => {
    Sres_lib.addNewArticle(globalPool, res, req.body);

});

api.post("/updateArticleInfo", (req, res) => {
    Sres_lib.updateArticleInfo(globalPool, res, req.body);
});

api.post("/deleteArticle", (req, res) => {
    Sres_lib.deleteArticle(globalPool, res, req.body);
});

api.post("/allocateArticle", (req, res) => {
    Sres_lib.allocateArticle(globalPool, res, req.body);
});

api.post("/dislocateArticle", (req, res) => {
    Sres_lib.dislocateArticle(globalPool, res, req.body);
});




api.post("/getArticleCategories", (req, res) => {
    Sres_lib.getArticleCategories(globalPool, res);
});

api.post("/getBuildings", (req, res) => {
    Sres_lib.getBuildings(globalPool, res);
});
  
api.post("/getFloors", (req, res) => {
    Sres_lib.getFloors(globalPool, res, req.body);
});
  
api.post("/getRooms", (req, res) => {
    Sres_lib.getRooms(globalPool, res, req.body);
});
  


api.listen(port, () => {

    console.log("AIDC-SERVER WULS IO gr.4");
});