'use strict';

const { Joi } = require('../../../utils/joiUtils');
// const J = require('Joi')
// load controllers
const {
    categoryController
} = require(`../../../controllers`);

const { AVAILABLE_AUTHS,
	 ORDER ,
	 TYPE
	} = require('../../../utils/constants');

let routes = [
	{
		method: 'POST',
		path: '/v1/category/create',
		joiSchemaForSwagger: {
			body: {
				title: Joi.string().required(),
			},
			group: 'categories',
			description: `Route to create a category.`,
			model: 'category_create'
		},
		auth: true,
		handler: categoryController.createCategory
	},
	{
		method: 'GET',
		path: '/v1/category/getall',
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
			group: 'categories',
			description: `Route to get all categories.`,
			payloadDocumentation: `## Request query will contains:\n **page:** page starts with 1 \n **pageSize:** page size \n **field:** column which needs to be order by \n **order:** ASC or DESC \n  ### if no query parameger available will return all the data, `,
			model: 'getAllCategories'
		},
		auth: true,
		handler: categoryController.getCategories
	},
	{
		method: 'GET',
		path: '/v1/category/get/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.number().integer().description('Category Id')
			},
			group: 'categories',
			description: `Route to get a category.`,
			model: 'get_category'
		},
		auth: true,
		handler: categoryController.getCategory
	},
	{
		method: 'PUT',
		path: '/v1/category/update/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			body: {
				title: Joi.string().optional(),
			},
			params: {
				id: Joi.number().integer().required().description('Category Id'),
			},
			group: 'categories',
			description: `Route to update category`,
			model: 'updateCategoryDetail'
		},
		auth: true,
		handler: categoryController.updateCategory
	},
	{
		method: 'DELETE',
		path: '/v1/category/delete/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.string().description('category Id'),
			},
			group: 'categories',
			description: `Route to delete category`,
			model: 'deleteCategory'
		},
		auth: true,
		handler: categoryController.removeCategory
	}
];

module.exports = routes;
