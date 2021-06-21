/**
 * Funkcja odpowiedzialna za zwracanie raportu na podstawie zmiennej ReportChoice
 * Po jej użyciu do aplikacji zostanie odesłany wynik tej funkcji do ServerResponse<br>
 * @function Sres_getArticleReport
 * @param {object} pool - Pula połączeń z bazą danych mySQL, zarządza połączeniami z serwerem
 * @param {function} res - Funkcja odsyłająca pakiety danych do klienta
 * @param {object} params - Zbiór parametrów
 */
function Sres_getArticleReport(pool, res, params) {
	const { ServerResponse } = require('./ServerResponse');

	const contentCreator = Sres_promise(pool, params);

	ServerResponse(contentCreator, res);
}
/**
 * Tworzenie raportu dla wybranego budynku
 * @constant
 * @param {object} pool - Pula połączeń z bazą danych mySQL, zarządza połączeniami z serwerem
 * @param {object} building - Budynek dla którego ma zostać stworzony raport
 * @param {object} resolve - Funkcja Callback, który poprawnie rozwiązuje Promise w przypadku kiedy nie ma błedu
 * @param {object} reject - Funkcja Callback, który poprawnie rozwiązuje Promise w przypadku kiedy istnieje błąd
 */
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
/**
 * Tworzenie raportu z danego piętra
 * @constant
 * @param {object} pool - Pula połączeń z bazą danych mySQL, zarządza połączeniami z serwerem
 * @param {object} building - Wybrany budynek
 * @param {object} floor - Piętro, dla którego ma zostać wygenerowany raport
 * @param {object} resolve - Funkcja Callback, który poprawnie rozwiązuje Promise w przypadku kiedy nie ma błedu
 * @param {object} reject - Funkcja Callback, który poprawnie rozwiązuje Promise w przypadku kiedy istnieje błąd
 */
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
/**
 * Tworzenie raportu z danego pokoju w wybranym budynku
 * @constant
 * @param {object} pool - Pula połączeń z bazą danych mySQL, zarządza połączeniami z serwerem
 * @param {object} building - Wybrany budynek
 * @param {object} floor -Wybrane piętro
 * @param {object} room - Pokój dla którego ma zostać stworzony raport
 * @param {object} resolve - Funkcja Callback, który poprawnie rozwiązuje Promise w przypadku kiedy nie ma błedu
 * @param {object} reject - Funkcja Callback, który poprawnie rozwiązuje Promise w przypadku kiedy istnieje błąd
 */
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
/**
 * Tworzenie raportu z kategori artykułów
 * @constant
 * @param {object} pool - Pula połączeń z baża danych mySQL, zarządza połączeniami z serwerem
 * @param {object} category - Kategoria dla której ma zostać stworzony raport
 * @param {object} resolve - Funkcja Callback, który poprawnie rozwiązuje Promise w przypadku kiedy nie ma błedu
 * @param {object} reject - Funkcja Callback, który poprawnie rozwiązuje Promise w przypadku kiedy istnieje błąd
 */
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

/**
 * Funkcja, która pobiera pulę połączeń i rozbija argument params przekazany przez funkcję Sres
 * @function Sres_promise
 * @param {object} pool - Pula połączeń z baża danych mySQL, zarządza połączeniami z serwerem
 * @param {object} params - Rozbity argument params na reportChoice, building, floor, room i category
 */
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

