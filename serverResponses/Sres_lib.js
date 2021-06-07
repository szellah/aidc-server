
const { Sres_getAccountInfo } = require('./Sres_getAccountInfo');
const { Sres_getAccountReport } = require('./Sres_getAccountReport');
const { Sres_test } = require('./Sres_test');

const { Sres_changeAccountPasword } = require('./Sres_changeAccountPasword');

const { Sres_addNewArticle } = require("./Sres_addNewArticle");
const { Sres_updateArticleInfo } = require("./Sres_updateArticleInfo");
const { Sres_deleteArticle } = require("./Sres_deleteArticle");
const { Sres_allocateArticle } = require("./Sres_allocateArticle");
const { Sres_dislocateArticle } = require("./Sres_dislocateArticle");

const { Sres_getLocationInfo } = require('./Sres_getLocationInfo');
const { Sres_addNewLocation } = require('./Sres_addNewLocation');
const { Sres_updateLocation } = require('./Sres_updateLocation');
const { Sres_deleteLocation } = require('./Sres_deleteLocation');

module.exports = {
	test: Sres_test,
	getAccountInfo: Sres_getAccountInfo,
	getAccountReport: Sres_getAccountReport,
	changeAccountPasword: Sres_changeAccountPasword,
  
  addNewArticle: Sres_addNewArticle,
  updateArticleInfo: Sres_updateArticleInfo,
  deleteArticle: Sres_deleteArticle,
  allocateArticle: Sres_allocateArticle,
  dislocateArticle: Sres_dislocateArticle,
  
  getLocationInfo: Sres_getLocationInfo,
	addNewLocation: Sres_addNewLocation,
	updateLocation: Sres_updateLocation,
	deleteLocation: Sres_deleteLocation,
};

