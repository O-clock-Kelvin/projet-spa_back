/** @format */
import dotenv from 'dotenv';

import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

dotenv.config();


// initialisation du module de mail
const mailer = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD,
	},
});


// initialisation du moteur de rendu HTML, qui compile les fichiers contenus dans /mails et y ajoute les variables
mailer.use(
	'compile',
	hbs({
		viewEngine: {
			extName: '.handlebars',
			partialsDir: 'mails',
			defaultLayout: false,
		},
		viewPath: './src/mails',
	})
);

export default mailer;
