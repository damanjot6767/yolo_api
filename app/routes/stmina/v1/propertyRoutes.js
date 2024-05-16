'use strict';

const { Joi } = require('../../../utils/joiUtils');
// const J = require('Joi')
// load controllers
const {
    propertyController
} = require(`../../../controllers`);

const { AVAILABLE_AUTHS,
	 ORDER ,
	 TYPE
	} = require('../../../utils/constants');

let routes = [
	{
		method: 'POST',
		path: '/v1/property/create',
		joiSchemaForSwagger: {
			body: {
				email: Joi.string().email({ tlds: { allow: false } }).required(),
				title: Joi.string().required(),
				images: Joi.array().items(Joi.object()).default([]),
				description: Joi.string().required(),
				coordinates: Joi.object().required(),
				contactNo: Joi.number().required(),
			},
			group: 'property',
			description: `Route to create a property.`,
			model: 'property_create'
		},
		auth: true,
		handler: propertyController.createProperty
	},
	{
		method: 'GET',
		path: '/v1/property/getall',
		joiSchemaForSwagger: {
			headers:{
				'authorization': Joi.string().required().description('User\'s token.')
			},
			query: {
				title: Joi.string().optional(),
				email: Joi.string().optional(),
				// common fields
				page: Joi.number().min(1).optional().description('Page number starting with 1'),
				pageSize: Joi.number().optional().description('page size'),
				field: Joi.string().default('createdAt').optional().description('field Name'),
				order: Joi.string().default('ASC').optional().valid(...Object.values(ORDER)).description('ASC | DESC'),
			},
			group: 'property',
			description: `Route to get all properties.`,
			payloadDocumentation: `## Request query will contains:\n **page:** page starts with 1 \n **pageSize:** page size \n **field:** column which needs to be order by \n **order:** ASC or DESC \n  ### if no query parameger available will return all the data, `,
			model: 'getAllProperties'
		},
		auth: true,
		handler: propertyController.getProperties
	},
	{
		method: 'GET',
		path: '/v1/property/get/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.number().integer().description('property Id')
			},
			group: 'property',
			description: `Route to get a property.`,
			model: 'get_property'
		},
		auth: true,
		handler: propertyController.getProperty
	},
	{
		method: 'PUT',
		path: '/v1/property/update/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			body: {
				title: Joi.string().optional(),
				images: Joi.array().items(Joi.object()),
				description: Joi.string().optional(),
				coordinates: Joi.object().optional(),
				contactNo: Joi.number().optional(),
			},
			params: {
				id: Joi.number().integer().required().description('property Id'),
			},
			group: 'property',
			description: `Route to update property`,
			model: 'updatePropertyDetail'
		},
		auth: true,
		handler: propertyController.updateProperty
	},
	{
		method: 'DELETE',
		path: '/v1/property/delete/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.string().description('property Id'),
			},
			group: 'property',
			description: `Route to delete property`,
			model: 'deleteProperty'
		},
		auth: true,
		handler: propertyController.removeProperty
	}
];

module.exports = routes;
