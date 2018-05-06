'use strict';

var nodemailer = require('nodemailer');

module.exports = function mailer() {
    // Create the transporter with the required configuration for Gmail
    // change the user and pass !
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: '@gmail.com',
            pass: ''
        }
    });

    // setup e-mail data
    var mailOptions = {
        from: '"D-Tracker" <myemail@gmail.com>', // sender address (who sends)
        to: '@gmail.com', // list of receivers (who receives)
        subject: 'Registration e-verification', // Subject line
        text: 'Hello world ', // plaintext body
        html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
};