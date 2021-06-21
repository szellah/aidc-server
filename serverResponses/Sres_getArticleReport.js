function Sres_getArticleReport(pool, res, params) {
	const { ServerResponse } = require('./ServerResponse');

	const contentCreator = Sres_promise(pool, params);

	ServerResponse(contentCreator, res);
}

const BuildingReport = (pool,building, resolve , reject) => {
    const { query } = require('mysql');
    pool.query(
        `SELECT ArticleId, Category, Name, Building, Floor, Room FROM \`articles\` LEFT JOIN \`locations\` ON \`articles\`.\`LocationId\` = \`locations\`.\`LocationId\` WHERE Building = ${building} `,
        (error, results, fields) => {
            if (error) {
                reject(error);
            } else {

                let table = results.map((row) => {
                    return {
                        column1: `${row.ArticleId}\n${row.Category}`,
                        column2: row.Name,
                        column3: `${row.Floor} / ${row.Room}`,
                        id: row.ArticleId.toString()
                    };
                });
                const header = { column1: "Id\nKategoria", column2: "Nazwa", column3: "Lokalizacja", id: "header" };
                table = [ header, ...table];
                resolve(table);
            }
        }
    );
}

const FloorReport = (pool,building, floor, resolve , reject) => {
    const { query } = require('mysql');
    pool.query(
        `SELECT ArticleId, Category, Name, Building, Floor, Room FROM \`articles\` LEFT JOIN \`locations\` ON \`articles\`.\`LocationId\` = \`locations\`.\`LocationId\` WHERE Building = ${building} AND Floor=${floor} `,
        (error, results, fields) => {
            if (error) {
                reject(error);
            } else {

                let table = results.map((row) => {
                    return {
                        column1: `${row.ArticleId}\n${row.Category}`,
                        column2: row.Name,
                        column3: `${row.Room}`,
                        id: row.ArticleId.toString()
                    };
                });
                const header = { column1: "Id\nKategoria", column2: "Nazwa", column3: "Lokalizacja", id: "header" };
                table = [ header, ...table];
                resolve(table);
            }
        }
    );
}

const RoomReport = (pool,building, floor, room, resolve , reject) => {
    const { query } = require('mysql');
    console.log("RoomReport");
    pool.query(
        `SELECT ArticleId, Category, Name, Building, Floor, Room FROM \`articles\` LEFT JOIN \`locations\` ON \`articles\`.\`LocationId\` = \`locations\`.\`LocationId\` WHERE Building = ${building} AND Floor=${floor} AND Room = ${room}`,
        (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                let table = results.map((row) => {
                    return {
                        column1: row.ArticleId.toString(),
                        column2: row.Name,
                        column3: row.Category.toString(),
                        id: row.ArticleId.toString()
                    };
                });
                const header = { column1: "Id", column2: "Nazwa", column3: "Kategoria", id: "header" };
                table = [ header, ...table];
                resolve(table);
            }
        }
    );
}

const CategoryReport = (pool, category, resolve , reject) => {
    const { query } = require('mysql');
    pool.query(
        `SELECT ArticleId, Category, Name, Building, Floor, Room FROM \`articles\` LEFT JOIN \`locations\` ON \`articles\`.\`LocationId\` = \`locations\`.\`LocationId\` WHERE Category = "${category}" `,
        (error, results, fields) => {
            if (error) {
                reject(error);
            } else {

                let table = results.map((row) => {
                    return {
                        column1: `${row.ArticleId}`,
                        column2: row.Name,
                        column3: `${row.Building} / ${row.Floor} / ${row.Room}`,
                        id: row.ArticleId.toString()
                    };
                });
                const header = { column1: "Id", column2: "Nazwa", column3: "Lokalizacja", id: "header" };
                table = [ header, ...table];
                resolve(table);
            }
        }
    );
}


function Sres_promise(pool, {reportChoice, building, floor, room, category}) {
	return new Promise((resolve, reject) => {
        switch(reportChoice){

            case 'Budynek':
                BuildingReport(pool, building, resolve, reject); 
                break;

            case 'Piętro':
                FloorReport(pool, building, floor, resolve, reject); 
                break;

            case 'Pokój':
                RoomReport(pool, building, floor, room, resolve, reject); 
                break;

            case 'Kategoria':
                CategoryReport(pool, category, resolve, reject); 
                break;    
        }
		
	});
}

module.exports = {
	Sres_getArticleReport,

};

