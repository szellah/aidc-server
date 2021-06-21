function Sres_getBuildings(pool, res){

    const { ServerResponse } = require('./ServerResponse');

    const contentCreator = Sres_promise(pool);

    ServerResponse(contentCreator, res);
}

function Sres_promise(pool){
return new Promise((resolve, reject) => {

const { query } = require('mysql');

pool.query(`SELECT DISTINCT Building FROM \`locations\` WHERE NOT Building = -1`, (error, results, fields) => {

    if(error)
    {
        reject(error.message);
    }
    else
    {
        let i = 0;
        const buildings = results.map((row) => {
            return {name: `budynek ${row.Building}`, value: row.Building.toString(), id: i++};
        })
        resolve(buildings);
    }
});

});

}

module.exports={
    Sres_getBuildings,
}