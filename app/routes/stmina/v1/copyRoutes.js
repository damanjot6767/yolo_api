'use strict';

const { Joi } = require('../../../utils/joiUtils');

// load controllers
const copyController = require(`../../../controllers/stmina/copyController`);

let routes = [
	{
		method: 'POST',
		path: '/v1/area/create',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			body: {
				areaName: Joi.string().required(),
				description: Joi.string().required(),
			},
			group: 'Areas',
			description: `Route to create area.`,
			// payloadDocumentation: `## Request body will contains: \n \n **email:** email of the user \n **password:** password of the user \n **isMobile:** Is request is coming from mobile application or not? \n **deviceToken:** user's device token for push notifications \n **appType:** from which application user is requesting login \n`,
			model: 'create_area'
		},
		auth: true,
		handler: copyController.create
	},{
		method: 'GET',
		path: '/v1/area/getall',
		joiSchemaForSwagger: {
			headers:{
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.number().description('Area Id')
			},
			group: 'Areas',
			description: `Route to get all areas`,
			// payloadDocumentation: `## Request body will contains: \n \n **email:** email of the user \n **password:** password of the user \n **isMobile:** Is request is coming from mobile application or not? \n **deviceToken:** user's device token for push notifications \n **appType:** from which application user is requesting login \n`,
			model: 'getAllAreas'
		},
		auth: true,
		handler: copyController.getAll
	},
	{
		method: 'GET',
		path: '/v1/area/get/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.number().description('Driver Id')
			},
			group: 'Areas',
			description: `Route to get area`,
			// payloadDocumentation: `## Request body will contains: \n \n **email:** email of the user \n **password:** password of the user \n **isMobile:** Is request is coming from mobile application or not? \n **deviceToken:** user's device token for push notifications \n **appType:** from which application user is requesting login \n`,
			model: 'get_area'
		},
		auth: true,
		handler: copyController.get
	},
	{
		method: 'PUT',
		path: '/v1/area/update/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			body: {
				firstName: Joi.string().required(),
				lastName: Joi.string().required(),
			},
			params: {
				id: Joi.number().description('Driver Id'),
			},
			group: 'Areas',
			description: `Route to update driver`,
			model: 'updateDriver'
		},
		auth: true,
		handler: copyController.update
	},
	{
		method: 'PUT',
		path: '/v1/area/delete/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.number().description('Driver Id'),
			},
			group: 'Areas',
			description: `Route to delete driver`,
			model: 'deleteDriver'
		},
		auth: true,
		handler: copyController.remove
	}
];

module.exports = routes;
