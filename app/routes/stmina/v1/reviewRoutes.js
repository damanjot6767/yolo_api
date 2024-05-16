'use strict';

const { Joi } = require('../../../utils/joiUtils');
// const J = require('Joi')
// load controllers
const {
    reviewController
} = require(`../../../controllers`);

const { AVAILABLE_AUTHS,
	 ORDER ,
	 TYPE
	} = require('../../../utils/constants');

let routes = [
	{
		method: 'POST',
		path: '/v1/review/create',
		joiSchemaForSwagger: {
			body: {
				title: Joi.string().required(),
				rating: Joi.number().required().min(1).max(5).default(1),
				description: Joi.string().required(),
				user_id: Joi.number().required(),
			},
			group: 'review',
			description: `Route to create a review.`,
			model: 'review_create'
		},
		auth: true,
		handler: reviewController.createReview
	},
	{
		method: 'GET',
		path: '/v1/review/getall',
		joiSchemaForSwagger: {
			headers:{
				'authorization': Joi.string().required().description('User\'s token.')
			},
			query: {
				title: Joi.string().optional(),
				number: Joi.number().optional(),
				user_id: Joi.number().optional(),
				// common fields
				page: Joi.number().min(1).optional().description('Page number starting with 1'),
				pageSize: Joi.number().optional().description('page size'),
				field: Joi.string().default('createdAt').optional().description('field Name'),
				order: Joi.string().default('ASC').optional().valid(...Object.values(ORDER)).description('ASC | DESC'),
			},
			group: 'review',
			description: `Route to get all properties.`,
			payloadDocumentation: `## Request query will contains:\n **page:** page starts with 1 \n **pageSize:** page size \n **field:** column which needs to be order by \n **order:** ASC or DESC \n  ### if no query parameger available will return all the data, `,
			model: 'getAllReviews'
		},
		auth: true,
		handler: reviewController.getReviews
	},
	{
		method: 'GET',
		path: '/v1/review/get/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.number().integer().description('review Id')
			},
			group: 'review',
			description: `Route to get a review.`,
			model: 'get_review'
		},
		auth: true,
		handler: reviewController.getReview
	},
	{
		method: 'DELETE',
		path: '/v1/review/delete/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.string().description('review Id'),
			},
			group: 'review',
			description: `Route to delete review`,
			model: 'deletereview'
		},
		auth: true,
		handler: reviewController.removeReview
	}
];

module.exports = routes;
