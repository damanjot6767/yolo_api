'use strict';

const { Joi } = require('../../../utils/joiUtils');

// load controllers
const adminController = require(`../../../controllers/stmina/adminController`);
const { AVAILABLE_AUTHS, USER_ROLES, FILTER_TYPES_FOR_NOTIFICATIONS, NOTIFICATION_TYPES } = require('../../../utils/constants');

let routes = [
	{
		method: 'POST',
		path: '/v1/admin/login',
		joiSchemaForSwagger: {
			body: {
				email: Joi.string(),
				password: Joi.string().required(),
				// isMobile: Joi.boolean(),
				// deviceToken: Joi.string(),
				// appType: Joi.string()
			},
			group: 'Admin',
			description: `Route to login a admin.`,
			// payloadDocumentation: `## Request body will contains: \n \n **email:** email of the user \n **password:** password of the user \n **isMobile:** Is request is coming from mobile application or not? \n **deviceToken:** user's device token for push notifications \n **appType:** from which application user is requesting login \n`,
			model: 'User_Login'
		},
		auth: false,
		handler: adminController.login
	},
];

module.exports = routes;
