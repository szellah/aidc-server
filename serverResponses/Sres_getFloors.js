function Sres_getFloors(pool, res, params){

    const { ServerResponse } = require('./ServerResponse');

    const contentCreator = Sres_promise(pool, params);

    ServerResponse(contentCreator, res);
}

function Sres_promise(pool, {building}){
return new Promise((resolve, reject) => {

const { query } = require('mysql');

pool.query(`SELECT DISTINCT Floor FROM \`locations\`WHERE Building = ${building}`, (error, results, fields) => {

    if(error)
    {
        reject(error.message);
    }
    else
    {
        let i = 0;
        const floors = results.map((row) => {
            return {name: row.Floor === 1 ?  'parter': `piętro ${row.Floor-1}`, value: row.Floor.toString(), id: i++};
        })
        resolve(floors);
    }
});

});

}

module.exports={
    Sres_getFloors,
}