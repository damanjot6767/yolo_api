'use strict';

const { Joi } = require('../../../utils/joiUtils');
// const J = require('Joi')
// load controllers
const {
    servicesController
} = require(`../../../controllers`);

const { AVAILABLE_AUTHS,
	 ORDER ,
	 TYPE
	} = require('../../../utils/constants');

let routes = [
	{
		method: 'POST',
		path: '/v1/service/create',
		joiSchemaForSwagger: {
			body: {
				title: Joi.string().required(),
				images: Joi.array().items(Joi.object()).default([]),
				icons: Joi.array().items(Joi.object()).default([]),
				description: Joi.string().required(),
			},
			group: 'services',
			description: `Route to create a services.`,
			model: 'services_create'
		},
		auth: true,
		handler: servicesController.createService
	},
	{
		method: 'GET',
		path: '/v1/service/getall',
		joiSchemaForSwagger: {
			headers:{
				'authorization': Joi.string().required().description('User\'s token.')
			},
			query: {
				title: Joi.string().optional(),
				// common fields
				page: Joi.number().min(1).optional().description('Page number starting with 1'),
				pageSize: Joi.number().optional().description('page size'),
				field: Joi.string().default('createdAt').optional().description('field Name'),
				order: Joi.string().default('ASC').optional().valid(...Object.values(ORDER)).description('ASC | DESC'),
			},
			group: 'services',
			description: `Route to get all properties.`,
			payloadDocumentation: `## Request query will contains:\n **page:** page starts with 1 \n **pageSize:** page size \n **field:** column which needs to be order by \n **order:** ASC or DESC \n  ### if no query parameger available will return all the data, `,
			model: 'getAllServices'
		},
		auth: true,
		handler: servicesController.getServices
	},
	{
		method: 'GET',
		path: '/v1/service/get/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.number().integer().description('service Id')
			},
			group: 'services',
			description: `Route to get a services.`,
			model: 'get_service'
		},
		auth: true,
		handler: servicesController.getService
	},
	{
		method: 'PUT',
		path: '/v1/service/update/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			body: {
				title: Joi.string().optional(),
				imageUrl: Joi.string().optional(),
				iconUrl: Joi.string().optional(),
				description: Joi.string().optional(),
			},
			params: {
				id: Joi.number().integer().required().description('service Id'),
			},
			group: 'services',
			description: `Route to update service`,
			model: 'updateServiceDetail'
		},
		auth: true,
		handler: servicesController.updateService
	},
	{
		method: 'DELETE',
		path: '/v1/service/delete/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.string().description('service Id'),
			},
			group: 'services',
			description: `Route to delete service`,
			model: 'deleteService'
		},
		auth: true,
		handler: servicesController.removeService
	}
];

module.exports = routes;
