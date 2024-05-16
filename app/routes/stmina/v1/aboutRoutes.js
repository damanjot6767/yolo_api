'use strict';

const { Joi } = require('../../../utils/joiUtils');
// const J = require('Joi')
// load controllers
const {
    aboutController
} = require(`../../../controllers`);

const { AVAILABLE_AUTHS,
	 ORDER ,
	 TYPE
	} = require('../../../utils/constants');

let routes = [
	{
		method: 'POST',
		path: '/v1/about/create',
		joiSchemaForSwagger: {
			body: {
				title: Joi.string().required(),
                description: Joi.string().required(),
				images: Joi.array().items(Joi.object()).default([]),
                awards: Joi.array().items(Joi.object()).default([]),
				coordinates: Joi.array().items(Joi.object()).default([]),
				socialLinks: Joi.array().items(Joi.object()).default([]),
				contactNo: Joi.number().optional(),
				email: Joi.string().email({ tlds: { allow: false } }).optional()
			},
			group: 'Abouts',
			description: `Route to create a about.`,
			model: 'about_create'
		},
		auth: true,
		handler: aboutController.createAbout
	},
	{
		method: 'GET',
		path: '/v1/about/getall',
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
			group: 'Abouts',
			description: `Route to get all abouts.`,
			payloadDocumentation: `## Request query will contains:\n **page:** page starts with 1 \n **pageSize:** page size \n **field:** column which needs to be order by \n **order:** ASC or DESC \n  ### if no query parameger available will return all the data, `,
			model: 'getAllAbouts'
		},
		auth: true,
		handler: aboutController.getAbouts
	},
	{
		method: 'GET',
		path: '/v1/about/get/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.number().integer().description('About Id')
			},
			group: 'Abouts',
			description: `Route to get a about.`,
			model: 'get_About'
		},
		auth: true,
		handler: aboutController.getAbout
	},
	{
		method: 'PUT',
		path: '/v1/about/update/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			body: {
				email: Joi.string().email({ tlds: { allow: false } }).optional(),
				title: Joi.string().optional(),
                description: Joi.string().optional(),
				images: Joi.array().items(Joi.object()).optional(),
                awards: Joi.array().items(Joi.object()).optional(),
				coordinates: Joi.array().items(Joi.object()).optional(),
				socialLinks: Joi.array().items(Joi.object()).optional(),
				contactNo: Joi.number().optional()
			},
			params: {
				id: Joi.number().integer().required().description('User Id'),
			},
			group: 'Abouts',
			description: `Route to update about`,
			model: 'updateAboutDetail'
		},
		auth: true,
		handler: aboutController.updateAbout
	},
	{
		method: 'DELETE',
		path: '/v1/about/delete/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.string().description('About Id'),
			},
			group: 'Abouts',
			description: `Route to delete about`,
			model: 'deleteAbout'
		},
		auth: true,
		handler: aboutController.removeAbout
	}
];

module.exports = routes;
