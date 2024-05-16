'use strict';

const { Joi } = require('../../../utils/joiUtils');
// const J = require('Joi')
// load controllers
const {
    roomController,
	roomReviewController
} = require(`../../../controllers`);

const { AVAILABLE_AUTHS,
	 ORDER ,
	 TYPE,
	 ROOM_BED_TYPE
	} = require('../../../utils/constants');

let routes = [
	{
		method: 'POST',
		path: '/v1/room/create',
		joiSchemaForSwagger: {
			body: {
				title: Joi.string().required(),
				images: Joi.array().items(Joi.object()).default([]),
				price: Joi.number().required(),
				adult: Joi.array().items(Joi.object()).required(),
				children: Joi.array().items(Joi.object()).required(),
				bookingNight: Joi.array().items(Joi.object()).required(),
				bedType : Joi.valid(...Object.values(ROOM_BED_TYPE)).required(),
				roomArea: Joi.number().required(),
				description: Joi.string().required(),
				coordinates: Joi.object().required(),
				service_ids: Joi.array().items(Joi.number()).default([]),
				property_id: Joi.number().required()
			},
			group: 'room',
			description: `Route to create a room.`,
			model: 'room_create'
		},
		auth: true,
		handler: roomController.createRoom
	},
	{
		method: 'GET',
		path: '/v1/room/getall',
		joiSchemaForSwagger: {
			headers:{
				'authorization': Joi.string().required().description('User\'s token.')
			},
			query: {
				title: Joi.string().optional(),
				price: Joi.number().optional(),
				bedType : Joi.valid(...Object.values(ROOM_BED_TYPE)).optional(),
				service_ids: Joi.array().items(Joi.number()).optional(),
				property_id: Joi.number().optional(),
				// common fields
				page: Joi.number().min(1).optional().description('Page number starting with 1'),
				pageSize: Joi.number().optional().description('page size'),
				field: Joi.string().default('createdAt').optional().description('field Name'),
				order: Joi.string().default('ASC').optional().valid(...Object.values(ORDER)).description('ASC | DESC'),
			},
			group: 'room',
			description: `Route to get all rooms.`,
			payloadDocumentation: `## Request query will contains:\n **page:** page starts with 1 \n **pageSize:** page size \n **field:** column which needs to be order by \n **order:** ASC or DESC \n  ### if no query parameger available will return all the data, `,
			model: 'getAllRooms'
		},
		auth: true,
		handler: roomController.getRooms
	},
	{
		method: 'GET',
		path: '/v1/room/get/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.number().integer().description('room Id')
			},
			group: 'room',
			description: `Route to get a room.`,
			model: 'get_room'
		},
		auth: true,
		handler: roomController.getRoom
	},
	{
		method: 'PUT',
		path: '/v1/room/update/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			body: {
				title: Joi.string().optional(),
				images: Joi.array().items(Joi.object()).optional(),
				price: Joi.number().optional(),
				adult: Joi.array().items(Joi.object()).optional(),
				children: Joi.array().items(Joi.object()).optional(),
				bookingNight: Joi.array().items(Joi.object()).optional(),
				bedType : Joi.valid(...Object.values(ROOM_BED_TYPE)).optional(),
				roomArea: Joi.number().optional(),
				description: Joi.string().optional(),
				coordinates: Joi.object().optional(),
				service_ids: Joi.array().items(Joi.number()).optional(),
				property_id: Joi.number().optional()
			},
			params: {
				id: Joi.number().integer().required().description('room Id'),
			},
			group: 'room',
			description: `Route to update room`,
			model: 'updateroomDetail'
		},
		auth: true,
		handler: roomController.updateRoom
	},
	{
		method: 'DELETE',
		path: '/v1/room/delete/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.string().description('room Id'),
			},
			group: 'room',
			description: `Route to delete room`,
			model: 'deleteroom'
		},
		auth: true,
		handler: roomController.removeRoom
	},
	{
		method: 'POST',
		path: '/v1/room_review/create',
		joiSchemaForSwagger: {
			body: {
				title: Joi.string().required(),
				rating: Joi.number().required().min(1).max(5),
				description: Joi.string().optional(),
				room_id: Joi.number().required(),
				user_id: Joi.number().required(),
			},
			group: 'room',
			description: `Route to create a room_review.`,
			model: 'room_review_create'
		},
		auth: AVAILABLE_AUTHS.USER,
		handler: roomReviewController.createRoomReview
	},
	{
		method: 'GET',
		path: '/v1/room_review/getall',
		joiSchemaForSwagger: {
			headers:{
				'authorization': Joi.string().required().description('User\'s token.')
			},
			query: {
				title: Joi.string().optional(),
				rating: Joi.number().optional(),
				room_id: Joi.number().required(),
				user_id: Joi.number().required(),
				// common fields
				page: Joi.number().min(1).optional().description('Page number starting with 1'),
				pageSize: Joi.number().optional().default(10).description('page size'),
				field: Joi.string().default('createdAt').optional().description('field Name'),
				order: Joi.string().default('ASC').optional().valid(...Object.values(ORDER)).description('ASC | DESC'),
			},
			group: 'room',
			description: `Route to get all rooms_reviews.`,
			payloadDocumentation: `## Request query will contains:\n **page:** page starts with 1 \n **pageSize:** page size \n **field:** column which needs to be order by \n **order:** ASC or DESC \n  ### if no query parameger available will return all the data, `,
			model: 'getAllRoomReviews'
		},
		auth: AVAILABLE_AUTHS.USER,
		handler: roomReviewController.getRoomReviews
	},
	{
		method: 'GET',
		path: '/v1/room_review/get/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.number().integer().description('room review Id')
			},
			group: 'room',
			description: `Route to get a room_review.`,
			model: 'get_room_review'
		},
		auth: AVAILABLE_AUTHS.USER,
		handler: roomReviewController.getRoomReview
	},
	// {
	// 	method: 'PUT',
	// 	path: '/v1/room/update/:id',
	// 	joiSchemaForSwagger: {
	// 		headers: {
	// 			'authorization': Joi.string().required().description('User\'s token.')
	// 		},
	// 		body: {
	// 			title: Joi.string().optional(),
	// 			images: Joi.array().items(Joi.Object()).optional(),
	// 			price: Joi.number().optional(),
	// 			adult: Joi.array().items(Joi.Object()).optional(),
	// 			children: Joi.array().items(Joi.Object()).optional(),
	// 			bookingNight: Joi.array().items(Joi.Object()).optional(),
	// 			bedType : Joi.valid(...Object.values(ROOM_BED_TYPE)).optional(),
	// 			roomArea: Joi.number().optional(),
	// 			description: Joi.string().optional(),
	// 			coordinates: Joi.Object().optional(),
	// 			service_ids: Joi.array().items(Joi.string()).optional(),
	// 			property_id: Joi.string().optional()
	// 		},
	// 		params: {
	// 			id: Joi.number().integer().required().description('room Id'),
	// 		},
	// 		group: 'room',
	// 		description: `Route to update room`,
	// 		model: 'updateroomDetail'
	// 	},
	// 	auth: true,
	// 	handler: roomController.updateRoom
	// },
	{
		method: 'DELETE',
		path: '/v1/room_review/delete/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.string().description('room review Id'),
			},
			group: 'room',
			description: `Route to delete room_review`,
			model: 'delete_room_review'
		},
		auth: true,
		handler: roomReviewController.removeRoomReview
	}
];

module.exports = routes;
