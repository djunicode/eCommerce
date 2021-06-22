import nodemailer from 'nodemailer';

const sendEmail = (name, email, subject, msg) => {

	const mailer = nodemailer.createTransport({

		service: 'gmail',
		auth: {
			user: process.env.NODEMAILER_USERNAME,
			pass: process.env.NODEMAILER_PASSWORD,
		},

	});

	const mailOptions = {

		from: process.env.NODEMAILER_USERNAME,
		to: email,
		subject: subject,
		html: 'Hello ' + name + ', ' + msg,

	};

	mailer.sendMail(mailOptions, (error, response) => {

		if (error) {
			console.log(error);
		}

	});
};

export { sendEmail };