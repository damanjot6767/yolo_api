'use strict';

const { Joi } = require('../../../utils/joiUtils');
// const J = require('Joi')
// load controllers
const {
	userController,
	adminController
} = require(`../../../controllers`);

const { AVAILABLE_AUTHS,
	 ORDER ,
	 TYPE
	} = require('../../../utils/constants');

let routes = [
	{
		method: 'POST',
		path: '/v1/user/create',
		joiSchemaForSwagger: {
			body: {
				name: Joi.string().required(),
				status: Joi.string().default('active'),
                image: Joi.object().optional(),
				email: Joi.string().email({ tlds: { allow: false } }),
				password: Joi.string().required().description("password for user login")
			},
			group: 'Users',
			description: `Route to create a user.`,
			model: 'driver_create'
		},
		auth: false,
		handler: userController.createUser
	},
	{
		method: 'GET',
		path: '/v1/user/getall',
		joiSchemaForSwagger: {
			headers:{
				'authorization': Joi.string().required().description('User\'s token.')
			},
			query: {
				name: Joi.string().optional(),
				email: Joi.string().optional(),
				status: Joi.valid(...Object.values(TYPE)).optional().description('if check show hidden users'),
				// common fields
				page: Joi.number().min(1).optional().description('Page number starting with 1'),
				pageSize: Joi.number().optional().description('page size'),
				field: Joi.string().default('createdAt').optional().description('field Name'),
				order: Joi.string().default('ASC').optional().valid(...Object.values(ORDER)).description('ASC | DESC'),
			},
			group: 'Users',
			description: `Route to get all users.`,
			payloadDocumentation: `## Request query will contains:\n **page:** page starts with 1 \n **pageSize:** page size \n **field:** column which needs to be order by \n **order:** ASC or DESC \n  ### if no query parameger available will return all the data, `,
			model: 'getAllUsers'
		},
		auth: true,
		handler: adminController.getUsers
	},
	{
		method: 'GET',
		path: '/v1/user/get/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.number().integer().description('User Id')
			},
			group: 'Users',
			description: `Route to get a user.`,
			// payloadDocumentation: `## Request body will contains: \n \n **email:** email of the user \n **password:** password of the user \n **isMobile:** Is request is coming from mobile application or not? \n **deviceToken:** user's device token for push notifications \n **appType:** from which application user is requesting login \n`,
			model: 'get_User'
		},
		auth: AVAILABLE_AUTHS.USER,
		handler: userController.getUser
	},
	{
		method: 'PUT',
		path: '/v1/user/update/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			body: {
				name: Joi.string().optional(),
				image: Joi.object().optional()
			},
			params: {
				id: Joi.number().integer().required().description('User Id'),
			},
			group: 'Users',
			description: `Route to update user`,
			model: 'updateUserDetail'
		},
		auth: AVAILABLE_AUTHS.USER,
		handler: userController.updateUser
	},
	{
		method: 'DELETE',
		path: '/v1/user/delete/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.string().description('User Id'),
			},
			group: 'Users',
			description: `Route to delete user`,
			model: 'deleteUser'
		},
		auth: true,
		handler: userController.removeUser
	},	
	{
		method: 'POST',
		path: '/v1/user/login',
		joiSchemaForSwagger: {
			body: {
				email: Joi.string().email({ tlds: { allow: false } }),
				password: Joi.string().required().description("password for user login")
			},
			group: 'Users',
			description: `Route to login a user`,
			model: 'user_login'
		},
		auth: false,
		handler: userController.login
	},
	{
		method: 'GET',
		path: '/v1/user/forgotPassword',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			query: {
				email: Joi.string().required().description("Email")
			},
			group: 'Users',
			description: `Route to get forgotPassword`,
			model: 'forgotPassword'
		},
		auth: false,
		handler: userController.forgotPassword
	},
	{
		method: 'POST',
		path: '/v1/user/validateAndResetPassword',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('Driver\'s token.')
			},
			body: {
				password: Joi.string().required().description('password'),
				repeatPassword: Joi.string().required().description('repeat password'),
				email: Joi.string().required().description("Email"),
				otp: Joi.number().required().description('otp')
			},
			group: 'Users',
			description: `Route to get validateAndResetPassword`,
			model: 'validateAndResetPassword'
		},
		auth: false,
		handler: userController.validateAndResetPassword
	}
];

module.exports = routes;
