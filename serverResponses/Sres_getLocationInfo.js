function Sres_getLocationInfo(pool, res, params){

    const { ServerResponse } = require('./ServerResponse');

    const contentCreator = Sres_promise(pool, params);

    ServerResponse(contentCreator, res);
}

function Sres_promise(pool, {locationId}){
return new Promise((resolve, reject) => {

const { query } = require('mysql');

pool.query(`SELECT * FROM \`locations\` WHERE LocationId = ${locationId}`, (error, results, fields) => {
    
    if(error)
    {
        reject(error.message);
    }
    else
    {
        resolve(results[0]);
    }
});

});

}

module.exports={
    Sres_getLocationInfo,
}