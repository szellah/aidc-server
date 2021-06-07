const { Sres_getAccountInfo } = require('./Sres_getAccountInfo');
const { Sres_getAccountReport } = require('./Sres_getAccountReport');
const { Sres_test } = require('./Sres_test');
const { Sres_getLocationInfo } = require('./Sres_getLocationInfo');
const { Sres_addNewLocation } = require('./Sres_addNewLocation');
const { Sres_updateLocation } = require('./Sres_updateLocation');
const { Sres_deleteLocation } = require('./Sres_deleteLocation');

module.exports = {
	test: Sres_test,
	getAccountInfo: Sres_getAccountInfo,
	getAccountReport: Sres_getAccountReport,
	getLocationInfo: Sres_getLocationInfo,
	addNewLocation: Sres_addNewLocation,
	updateLocation: Sres_updateLocation,
	deleteLocation: Sres_deleteLocation,
};
