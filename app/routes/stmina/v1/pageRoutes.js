'use strict';

const { Joi } = require('../../../utils/joiUtils');
// const J = require('Joi')
// load controllers
const {
    pageController
} = require(`../../../controllers`);

const { AVAILABLE_AUTHS,
	 ORDER ,
	 TYPE
	} = require('../../../utils/constants');

let routes = [
	{
		method: 'POST',
		path: '/v1/page/create',
		joiSchemaForSwagger: {
			body: {
				title: Joi.string().required(),
                description: Joi.string().required(),
				images: Joi.array().items(Joi.object()).default([]),
			},
			group: 'pages',
			description: `Route to create a page.`,
			model: 'page_create'
		},
		auth: true,
		handler: pageController.createPage
	},
	{
		method: 'GET',
		path: '/v1/page/getall',
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
			group: 'pages',
			description: `Route to get all pages.`,
			payloadDocumentation: `## Request query will contains:\n **page:** page starts with 1 \n **pageSize:** page size \n **field:** column which needs to be order by \n **order:** ASC or DESC \n  ### if no query parameger available will return all the data, `,
			model: 'getAllpages'
		},
		auth: false,
		handler: pageController.getPages
	},
	{
		method: 'GET',
		path: '/v1/page/get/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.number().integer().description('page Id')
			},
			group: 'pages',
			description: `Route to get a page.`,
			model: 'get_page'
		},
		auth: false,
		handler: pageController.getPage
	},
	{
		method: 'PUT',
		path: '/v1/page/update/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			body: {
				title: Joi.string().optional(),
                description: Joi.string().optional(),
				images: Joi.array().items(Joi.object()).optional(),
			},
			params: {
				id: Joi.number().integer().required().description('User Id'),
			},
			group: 'pages',
			description: `Route to update page`,
			model: 'updatepageDetail'
		},
		auth: true,
		handler: pageController.updatePage
	},
	{
		method: 'DELETE',
		path: '/v1/page/delete/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.string().description('page Id'),
			},
			group: 'pages',
			description: `Route to delete page`,
			model: 'deletepage'
		},
		auth: true,
		handler: pageController.removePage
	}
];

module.exports = routes;
