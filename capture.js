var webshot = require('./lib/webshot');
var moment = require('moment');

var fs = require("fs");

var options = {
	screenSize: {
	    width: 1200,
	    height: 800
	},
	shotSize : {
		width: 'window',
		height: 'all'
	}
};

webshot('google.co.uk', './google.png', options,  function(err) {
	if (err) return console.log(err);
	console.log('OK');

	var nodemailer = require('nodemailer');
	var transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: '<USER_NAME>',
	        pass: '<PASSWORD>'
	    },
	    tls: {
	        rejectUnauthorized: false
	    }
	});

	transporter.sendMail({
	    from: '<FROM>',
	    to: '<TO>',
	    subject: 'Web Screenshot: ' + moment().format() ,
	    html: 'Embedded image: <img src="cid:unique@screenshot1"/>',
	    attachments: [{
	        filename: 'google.png',
	        content: fs.createReadStream('./google.png'),
	        cid: 'unique@screenshot1' //same cid value as in the html img src
	    }]
	}, function(error, info){
	    if(error){
	        console.log(error);
	    }else{
	        console.log('Message sent: ' + info.response);
	    }
	});
});