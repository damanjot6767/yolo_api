'use strict';

const { Joi } = require('../../../utils/joiUtils');
// const J = require('Joi')
// load controllers
const {
    experienceController
} = require(`../../../controllers`);

const { AVAILABLE_AUTHS,
	 ORDER ,
	 TYPE
	} = require('../../../utils/constants');

let routes = [
	{
		method: 'POST',
		path: '/v1/experience/create',
		joiSchemaForSwagger: {
			body: {
				title: Joi.string().required(),
				images: Joi.array().items(Joi.object()).default([]),
				description: Joi.string().required(),
			},
			group: 'experience',
			description: `Route to create a experience.`,
			model: 'experience_create'
		},
		auth: true,
		handler: experienceController.createExperience
	},
	{
		method: 'GET',
		path: '/v1/experience/getall',
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
			group: 'experience',
			description: `Route to get all experiences.`,
			payloadDocumentation: `## Request query will contains:\n **page:** page starts with 1 \n **pageSize:** page size \n **field:** column which needs to be order by \n **order:** ASC or DESC \n  ### if no query parameger available will return all the data, `,
			model: 'getAllExperiences'
		},
		auth: true,
		handler: experienceController.getExperiences
	},
	{
		method: 'GET',
		path: '/v1/experience/get/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.number().integer().description('experience Id')
			},
			group: 'experience',
			description: `Route to get a experience.`,
			model: 'get_experience'
		},
		auth: true,
		handler: experienceController.getExperience
	},
	{
		method: 'PUT',
		path: '/v1/experience/update/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			body: {
				title: Joi.string().optional(),
				images: Joi.array().items(Joi.object()).optional(),
				description: Joi.string().optional(),
			},
			params: {
				id: Joi.number().integer().required().description('experience Id'),
			},
			group: 'experience',
			description: `Route to update experience`,
			model: 'updateExperienceDetail'
		},
		auth: true,
		handler: experienceController.updateExperience
	},
	{
		method: 'DELETE',
		path: '/v1/experience/delete/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.string().description('experience Id'),
			},
			group: 'experience',
			description: `Route to delete experience`,
			model: 'deleteExperience'
		},
		auth: true,
		handler: experienceController.removeExperience
	}
];

module.exports = routes;
