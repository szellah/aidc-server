var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wziimgr4@gmail.com',
    pass: 'zaq1@WSX'
  }
});


const Sres_mailSender = (email, subject, text) => {
    transporter.sendMail(
        {
            from: 'wziimgr4@gmail.com',
            to: email,
            subject: subject,
            text: text
          }
        , function(error, info){
        if (error) {
        } else {
        }
      }); 
}

module.exports = {
    Sres_mailSender,
}