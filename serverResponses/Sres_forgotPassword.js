const { ConsoleWriter } = require('istanbul-lib-report');

function Sres_forgotPassword(pool, res, params){

    const { ServerResponse } = require('./ServerResponse');

    const contentCreator = Sres_promise(pool, params);

    ServerResponse(contentCreator, res);
}

function Sres_promise(pool, {Login}){
return new Promise((resolve, reject) => {




pool.query(`SELECT AccountId, Name, Surname, Login, Email, Rank, State FROM accounts WHERE Login = "${Login}"`, (error, results, fields) => {
    
    if(error)
    {
        reject(error);
    }
    else
    {
        const { setupPassword } = require("./Sres_resetPassword");
        setupPassword(pool, { UserId: results[0].AccountId})
					.then((message) => {
                        resolve(message);
                    })
                    .catch((error) => {
                        reject(error);
                    });
    }
});

});

}
	

module.exports = {
	Sres_forgotPassword,

};

