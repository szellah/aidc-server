
function Sres_getAccountInfo(pool, res, params){

    const { ServerResponse } = require('./ServerResponse');

    const contentCreator = Sres_promise(pool, params);

    ServerResponse(contentCreator, res);
}

function Sres_promise(pool, {accountId}){
return new Promise((resolve, reject) => {

		pool.query(
			`SELECT * FROM \`accounts\` WHERE AccountId = ${id}`,
			(error, results, fields) => {
				if (error) {


pool.query(`SELECT AccountId, Name, Surname, Login, Email, Rank, State FROM accounts WHERE AccountId = ${accountId}`, (error, results, fields) => {
    
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


				} else {
					console.log(results[0]);
					resolve(results);
				}
			}
		);
	});
}

module.exports = {
	Sres_getAccountInfo,

};

