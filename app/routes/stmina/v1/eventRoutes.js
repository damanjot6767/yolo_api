'use strict';

const { Joi } = require('../../../utils/joiUtils');
// const J = require('Joi')
// load controllers
const {
    eventController
} = require(`../../../controllers`);

const { AVAILABLE_AUTHS,
	 ORDER ,
	 TYPE,
	 EVENT_TYPE
	} = require('../../../utils/constants');

let routes = [
	{
		method: 'POST',
		path: '/v1/event/create',
		joiSchemaForSwagger: {
			body: {
				title: Joi.string().required(),
				images: Joi.array().items(Joi.object()).default([]),
				eventType: Joi.valid(...Object.values(EVENT_TYPE)).default(EVENT_TYPE.EVENT),
			},
			group: 'event',
			description: `Route to create a event.`,
			model: 'event_create'
		},
		auth: true,
		handler: eventController.createEvent
	},
	{
		method: 'GET',
		path: '/v1/event/getall',
		joiSchemaForSwagger: {
			headers:{
				'authorization': Joi.string().required().description('User\'s token.')
			},
			query: {
				title: Joi.string().optional(),
				eventType: Joi.valid(...Object.values(EVENT_TYPE)).optional(),
				// common fields
				page: Joi.number().min(1).optional().description('Page number starting with 1'),
				pageSize: Joi.number().optional().description('page size'),
				field: Joi.string().default('createdAt').optional().description('field Name'),
				order: Joi.string().default('ASC').optional().valid(...Object.values(ORDER)).description('ASC | DESC'),
			},
			group: 'event',
			description: `Route to get all events.`,
			payloadDocumentation: `## Request query will contains:\n **page:** page starts with 1 \n **pageSize:** page size \n **field:** column which needs to be order by \n **order:** ASC or DESC \n  ### if no query parameger available will return all the data, `,
			model: 'getAllEvents'
		},
		auth: true,
		handler: eventController.getEvents
	},
	{
		method: 'GET',
		path: '/v1/event/get/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.number().integer().description('event Id')
			},
			group: 'event',
			description: `Route to get a event.`,
			model: 'get_event'
		},
		auth: true,
		handler: eventController.getEvent
	},
	{
		method: 'PUT',
		path: '/v1/event/update/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			body: {
				title: Joi.string().optional(),
				images: Joi.array().items(Joi.object()).optional(),
				eventType: Joi.valid(...Object.values(EVENT_TYPE)).optional(),
			},
			params: {
				id: Joi.number().integer().required().description('event Id'),
			},
			group: 'event',
			description: `Route to update event`,
			model: 'updateEventDetail'
		},
		auth: true,
		handler: eventController.updateEvent
	},
	{
		method: 'DELETE',
		path: '/v1/event/delete/:id',
		joiSchemaForSwagger: {
			headers: {
				'authorization': Joi.string().required().description('User\'s token.')
			},
			params: {
				id: Joi.string().description('event Id'),
			},
			group: 'event',
			description: `Route to delete event`,
			model: 'deleteEvent'
		},
		auth: true,
		handler: eventController.removeEvent
	}
];

module.exports = routes;
