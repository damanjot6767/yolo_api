
const { eventModel
} = require(`../../models`);
const { Sequelize, Op } = require('sequelize');
const { TYPE, PACKAGE_TYPE, MESSAGES } = require('../../utils/constants');
const _ = require("lodash");
const { createErrorResponse } = require('../../helpers/stmina/common/resHelper');
const commonFunctions = require('../../utils/utils');
const CONSTANTS = require('../../utils/constants');

let eventService = {};

/**
 * function to create new event to the system.
 * @param {*} payload 
 * @returns 
 */
eventService.createEvent = async (payload) => {
    try {
        let event = await eventModel.create(payload);
        return event
    } catch (err) {
        throw err;
    }
};

/**
 * function to fetch event from the system.
 * @param {*} criteria 
 * @returns 
 */
eventService.getEvent = async (criteria) => {
    const event = await eventModel.findOne({ where: criteria });

    if(!event) return createErrorResponse(CONSTANTS.MESSAGES.NOT_FOUND, CONSTANTS.ERROR_TYPES.DATA_NOT_FOUND);
    return event
};

/**
 * function to update event data in the database.
 */
eventService.updatEevent = async (criteria, payload) => {
    try {
        let event = await eventModel.update(payload, { where: criteria });
        return event;
    } catch (err) {
        throw err;
    }
};

/**
 * function to remove event from system.
 * @param {*} criteria 
 * @returns 
 */
eventService.removeEvent = async (criteria) => {
    return await eventModel.destroy({ where: criteria });
};

/**
 * function to get All event from system.
 * @param {*} criteria 
 * @returns 
 */
eventService.getEvents = async (payload) => {
    let query = {};
    let filter = {}
    /**
     * filter section start
     */
    if(payload?.title) {filter['title'] = payload?.title;}
    if(payload?.eventType) {filter['eventType'] = payload?.eventType;}
    if(filter) {
        query["where"] = filter;
    }
    /* filter section end */

    if(payload?.field && payload?.order){
        const orderBy = [
            [payload.field, payload.order]
        ]
        query['order'] = orderBy 
    }
    if(payload?.page && payload?.pageSize){
        const offset = payload.page == 1 ? (payload.page-1) : ((payload.page-1) * payload.pageSize);
        const limit = payload.pageSize;
        query['offset'] = offset;
        query['limit'] = limit
    }
    
    query['distinct']= true
    return await eventModel.findAndCountAll(query);
};


module.exports = eventService;
