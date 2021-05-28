const { Sres_getAccountInfo } = require('./Sres_getAccountInfo');
const { Sres_getAccountReport } = require('./Sres_getAccountReport');
const { Sres_test } = require('./Sres_test');
const { Sres_changeAccountPasword } = require('./Sres_changeAccountPasword');

module.exports = {
	test: Sres_test,
	getAccountInfo: Sres_getAccountInfo,
	getAccountReport: Sres_getAccountReport,
	changeAccountPasword: Sres_changeAccountPasword,
};