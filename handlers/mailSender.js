let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wziimgr4@gmail.com',
    pass: 'zaq1@WSX'
  }
});

/**
 * Wysłanie wiadomości na podanego maila
 * @constant
 * @param {object} email - Email, na który ma zostać wysłana wiadomość
 * @param {object} subject - Temat maila
 * @param {object} text - Zawartość maila
 */
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