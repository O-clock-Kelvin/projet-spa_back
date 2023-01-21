/** @format */

import mailer from '../mailer.js';

const mailService = {
	/**
	 *
	 * @param {Object} mailOptions
	 * @param {string} [mailOptions.senderName] - Name of the sender
	 * @param {string} mailOptions.senderEmail - Email of the sender
	 * @param {string} mailOptions.recipient - Email of the recipient
	 * @param {string} mailOptions.title - Mail title
	 * @param {string} mailOptions.text - Mail content in plain text format
	 */
	sendRawEmail: async (mailOptions) => {
		try {
			await mailer.sendMail({
				from: `${mailOptions.senderName}<${mailOptions.senderEmail}>`,
				to: mailOptions.recipient,
				subject: mailOptions.title,
				text: mailOptions.text,
			});
		} catch (mailError) {
			/**
			 * @todo error handling
			 */
			throw new Error(mailError);
		}
	},

	/**
	 *
	 * @param {Object} mailOptions
	 * @param {string} [mailOptions.senderName] - Name of the sender
	 * @param {string} mailOptions.senderEmail - Email of the sender
	 * @param {string} mailOptions.recipient - Email of the recipient
	 * @param {string} mailOptions.title - Mail title
	 * @param {string} mailOptions.html - Mail content, a string containing html
	 */
	sendHtmlEmail: async (mailOptions) => {
		try {
			await mailer.sendMail({
				from: `${mailOptions.senderName}<${mailOptions.senderEmail}>`,
				to: mailOptions.recipient,
				subject: mailOptions.title,
				html: mailOptions.html,
			});
		} catch (mailError) {
			/**
			 * @todo error handling
			 */
			throw new Error(mailError);
		}
	},

	/**
	 *
	 * @param {Object} mailOptions
	 * @param {string} [mailOptions.senderName] - Name of the sender
	 * @param {string} mailOptions.senderEmail - Email of the sender
	 * @param {string} mailOptions.recipient - Email of the recipient
	 * @param {string} mailOptions.title - Mail title
	 * @param {string} mailOptions.template - Template name (ex: helloWorld)
	 * @param {Object} mailOptions.data - containing the data to be passed to the email template
	 */
	sendTemplateEmail: async (mailOptions) => {
		try {
			await mailer.sendMail({
				from: `${mailOptions.senderName}<${mailOptions.senderEmail}>`,
				to: mailOptions.recipient,
				subject: mailOptions.title,
				template: mailOptions.template,
				context: mailOptions.data,
			});
		} catch (mailError) {
			/**
			 * @todo error handling
			 */
			throw new Error(mailError);
		}
	},
};

export default mailService;
