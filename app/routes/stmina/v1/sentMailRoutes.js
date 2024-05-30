'use strict';

const { Joi } = require('../../../utils/joiUtils');
// const J = require('Joi')
// load controllers
const {
    sentMailController
} = require(`../../../controllers`);

const { AVAILABLE_AUTHS,
	 ORDER ,
	 TYPE
	} = require('../../../utils/constants');

let routes = [
	{
		method: 'POST',
		path: '/v1/sent-mail/normal',
		joiSchemaForSwagger: {
			body: {
                email: Joi.string().email({ tlds: { allow: false } }),
				name: Joi.string().required(),
                description: Joi.string().required(),
                subject: Joi.string().required(),
				phone: Joi.number().required(),
			},
			group: 'Mail',
			description: `Route to sent a normal mail.`,
			model: 'sent_mail'
		},
		auth: false,
		handler: sentMailController.sentNormalMail
	}
];

module.exports = routes;
