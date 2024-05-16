"use strict";
const {
    responseHelper:{
        createSuccessResponse,
        createErrorResponse
    }
} = require("../../helpers");
const CONSTANTS = require('../../utils/constants');
const { MESSAGES, ERROR_TYPES } = require('../../utils/constants');
const utils = require(`../../utils/utils`);
const { eventService } = require('../../services');

/*********************************************************
 ***** event controller  *****
 *********************************************************/
let eventController = {};

/**
 * create controller 
 */
eventController.createEvent = async (payload) => {
    const event = await eventService.createEvent(payload);

    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: event });
};

eventController.getEvent = async (payload) => {
    const event = await eventService.getEvent({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: event });
};

eventController.updateEvent = async (payload) => {
    try {
        let criteria = { id : payload.id };
        const event = await eventService.updatEevent(criteria,payload);
        return Object.assign(createSuccessResponse(
            CONSTANTS.MESSAGES.SUCCESS
            ), 
            { data: event });
    }catch (error) {
        console.log(error);
    }
};

eventController.removeEvent = async (payload) => {
    let criteria = { id : payload.id };
    const event = await eventService.removeEvent(criteria);
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: event });
};

eventController.getEvents = async (payload) => {
    const event = await eventService.getEvents({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: event });
};

module.exports = eventController;
