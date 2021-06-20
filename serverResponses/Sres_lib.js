const { Sres_getAccountInfo } = require('./Sres_getAccountInfo');
const { Sres_getArticleInfo } = require('./Sres_getArticleInfo');
const { Sres_getAccountReport } = require('./Sres_getAccountReport');
const { Sres_test } = require('./Sres_test');



const { Sres_changeAccountPasword } = require('./Sres_changeAccountPasword');

const { Sres_addNewArticle } = require("./Sres_addNewArticle");
const { Sres_updateArticleInfo } = require("./Sres_updateArticleInfo");
const { Sres_deleteArticle } = require("./Sres_deleteArticle");
const { Sres_allocateArticle } = require("./Sres_allocateArticle");
const { Sres_dislocateArticle } = require("./Sres_dislocateArticle");


const { Sres_getArticleReport } = require('./Sres_getArticleReport');

const { Sres_getLocationInfo } = require('./Sres_getLocationInfo');
const { Sres_addNewLocation } = require('./Sres_addNewLocation');
const { Sres_updateLocation } = require('./Sres_updateLocation');
const { Sres_deleteLocation } = require('./Sres_deleteLocation');


const { Sres_addNewUser } = require('./Sres_addNewUser');
const { Sres_deleteUser } = require('./Sres_deleteUser');
const { Sres_updateUser } = require('./Sres_updateUser');

const { Sres_getArticleCategories } = require('./Sres_getArticleCategories');
const { Sres_getBuildings } = require("./Sres_getBuildings");
const { Sres_getFloors } = require("./Sres_getFloors");
const { Sres_getRooms } = require("./Sres_getRooms");

const { Sres_login } = require('./Sres_login');

const { Sres_resetPassword } = require('./Sres_resetPassword');





module.exports = {
	test: Sres_test,
	getAccountInfo: Sres_getAccountInfo,
	getAccountReport: Sres_getAccountReport,
	changeAccountPasword: Sres_changeAccountPasword,
  
  getArticleInfo: Sres_getArticleInfo,
  addNewArticle: Sres_addNewArticle,
  updateArticleInfo: Sres_updateArticleInfo,
  deleteArticle: Sres_deleteArticle,
  allocateArticle: Sres_allocateArticle,
  dislocateArticle: Sres_dislocateArticle,

  getArticleReport: Sres_getArticleReport,
  
  getLocationInfo: Sres_getLocationInfo,
	addNewLocation: Sres_addNewLocation,
	updateLocation: Sres_updateLocation,
	deleteLocation: Sres_deleteLocation,

  addNewUser: Sres_addNewUser,
  deleteUser: Sres_deleteUser,
  updateUser: Sres_updateUser,

  getArticleCategories: Sres_getArticleCategories,
  getBuildings: Sres_getBuildings,
  getFloors: Sres_getFloors,
  getRooms: Sres_getRooms,

  login: Sres_login,

  resetPassword: Sres_resetPassword

};
