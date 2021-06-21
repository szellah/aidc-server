let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wziimgr4@gmail.com',
    pass: 'zaq1@WSX'
  }
});


const mailSender = (email, subject, text) => {
    return new Promise((resolve, reject) => {
         transporter.sendMail(
        {
            from: 'wziimgr4@gmail.com',
            to: email,
            subject: subject,
            text: text
          }
        , function(error, info){
        if (error) {
          reject(error);
        } else {
            resolve(`Wysłano nowe hasło na ${email}`);
        }
      }); 
    });
}

module.exports = {
    mailSender,
}