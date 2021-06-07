const { Sres_getAccountInfo } = require('./Sres_getAccountInfo');
const { Sres_getArticleInfo } = require('./Sres_getArticleInfo');
const { Sres_getLocationInfo } = require('./Sres_getLocationInfo');
const { Sres_getAccountReport } = require('./Sres_getAccountReport');
const { Sres_test } = require('./Sres_test');

module.exports={
    test: Sres_test,
    getAccountInfo: Sres_getAccountInfo,
    getAccountReport: Sres_getAccountReport,
    getLocationInfo: Sres_getLocationInfo,
    getArticleInfo: Sres_getArticleInfo,
}