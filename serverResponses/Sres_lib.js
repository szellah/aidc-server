const { Sres_getAccountInfo } = require('./Sres_getAccountInfo');
const { Sres_getAccountReport } = require('./Sres_getAccountReport');
const { Sres_getArticleInfo } = require("./Sres_getArticleInfo");
const { Sres_getNameInfo } = require("./Sres_getNameInfo");
const {Sres_login} = require("./Sres_login");
const { Sres_test } = require('./Sres_test');

module.exports={
    test: Sres_test,
    getAccountInfo: Sres_getAccountInfo,
    getAccountReport: Sres_getAccountReport,
    getArticleInfo: Sres_getArticleInfo,
    getNameInfo: Sres_getNameInfo,
    login: Sres_login,
}

