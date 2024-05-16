'use strict';

const { Joi } = require('../../../utils/joiUtils');
// const J = require('Joi')
// load controllers
const {
    tagController
} = require(`../../../controllers`);

const { AVAILABLE_AUTHS,
	 ORDER ,
	 TYPE
	} = require('../../../utils/constants');

let routes = [
	{
		method: 'POST',
		path: '/v1/tag/create',
		joiSchemaForSwagger: {
			body: {
				title: Joi.string().required(),
			},
			group: 'tags',
			description: `Route to create a tag.`,
			model: 'tag_create'
		},
		auth: true,
		handler: tagController.createTag
	},
	{
		method: 'GET',
		path: '/v1/tag/getall',
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
			group: 'tags',
			description: `Route to get all tags.`,
			payloadDocumentation: `## Request query will contains:\n **page:** page starts with 1 \n **pageSize:** page size \n **field:** column which needs to be order by \n **order:** ASC or DESC \n  ### if no query parameger available will return all the data, `,
			model: 'getAlltags'
		},
		auth: true,
		handler: tagController.getTags
	},
	{
		method: 'GET',
		path: '/v1/tag/get/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.number().integer().description('tag Id')
			},
			group: 'tags',
			description: `Route to get a tag.`,
			model: 'get_tag'
		},
		auth: true,
		handler: tagController.getTag
	},
	{
		method: 'PUT',
		path: '/v1/tag/update/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			body: {
				title: Joi.string().optional(),
			},
			params: {
				id: Joi.number().integer().required().description('Tag Id'),
			},
			group: 'tags',
			description: `Route to update tag`,
			model: 'updateTagDetail'
		},
		auth: true,
		handler: tagController.updateTag
	},
	{
		method: 'DELETE',
		path: '/v1/tag/delete/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.string().description('tag Id'),
			},
			group: 'tags',
			description: `Route to delete tag`,
			model: 'deleteTag'
		},
		auth: true,
		handler: tagController.removeTag
	}
];

module.exports = routes;
