'use strict';

const { Joi } = require('../../../utils/joiUtils');
// const J = require('Joi')
// load controllers
const {
    homeController
} = require(`../../../controllers`);

const { AVAILABLE_AUTHS,
	 ORDER ,
	 TYPE
	} = require('../../../utils/constants');

let routes = [
	{
		method: 'POST',
		path: '/v1/home/create',
		joiSchemaForSwagger: {
			body: {
				title: Joi.string().required(),
                description: Joi.string().required(),
				image: Joi.object().default(null),
			},
			group: 'Home',
			description: `Route to create a home.`,
			model: 'home_create'
		},
		auth: true,
		handler: homeController.createHome
	},
	{
		method: 'GET',
		path: '/v1/home/getall',
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
			group: 'Home',
			description: `Route to get all homes.`,
			payloadDocumentation: `## Request query will contains:\n **page:** page starts with 1 \n **pageSize:** page size \n **field:** column which needs to be order by \n **order:** ASC or DESC \n  ### if no query parameger available will return all the data, `,
			model: 'getAllHomes'
		},
		auth: false,
		handler: homeController.getHomes
	},
	{
		method: 'GET',
		path: '/v1/home/get/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.number().integer().description('Home Id')
			},
			group: 'Home',
			description: `Route to get a home.`,
			model: 'get_Home'
		},
		auth: false,
		handler: homeController.getHome
	},
	{
		method: 'PUT',
		path: '/v1/about/update/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			body: {
				title: Joi.string().optional(),
                description: Joi.string().optional(),
				images: Joi.object().optional(),
			},
			params: {
				id: Joi.number().integer().required().description('Home Id'),
			},
			group: 'Home',
			description: `Route to update home`,
			model: 'updateHomeDetail'
		},
		auth: true,
		handler: homeController.updateHome
	},
	{
		method: 'DELETE',
		path: '/v1/home/delete/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.string().description('Home Id'),
			},
			group: 'Home',
			description: `Route to delete home`,
			model: 'deleteHome'
		},
		auth: true,
		handler: homeController.removeHome
	}
];

module.exports = routes;
