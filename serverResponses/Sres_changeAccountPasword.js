var SHA256 = require("crypto-js/sha256");

function Sres_changeAccountPasword(pool, res, params) {
	Sres_promise(pool, params.id)
		.then((rows) => {
			res.send(rows[0]);
		})
		.catch((error) => {
			console.log(error);
		});
}

function Sres_promise(
	pool,
	{ userId, password }
) {
	return new Promise((resolve, reject) => 
	{
		const { query } = require('mysql');
        pool.query(
			`UPDATE accounts SET Password="${SHA256(password)}" WHERE AccountId = ${userId}`,
			(error, results, fields) => 
			{
				if (error) 
				{
					reject(error.message);
				} 
				else 
				{
                    resolve(`Zmieniono haslo`);
				}
			}
		);
	});
}

module.exports = {
	Sres_changeAccountPasword,
};