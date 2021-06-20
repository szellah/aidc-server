function Sres_getRooms(pool, res, params){

    const { ServerResponse } = require('./ServerResponse');

    const contentCreator = Sres_promise(pool, params);

    ServerResponse(contentCreator, res);
}

function Sres_promise(pool, {building, floor}){
return new Promise((resolve, reject) => {

const { query } = require('mysql');

pool.query(`SELECT DISTINCT Room FROM \`locations\`WHERE Building = ${building} AND Floor = ${floor}`, (error, results, fields) => {

    if(error)
    {
        reject(error.message);
    }
    else
    {
        let i = 0;
        const rooms = results.map((row) => {
            return {name: `pokój ${row.Room}`, value: row.Room.toString(), id: i++};
        })
        resolve(rooms);
    }
});

});

}

module.exports={
    Sres_getRooms,
}