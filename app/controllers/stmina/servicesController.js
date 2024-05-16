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
const {userService, servicesS, servicesServiceervice, servicesService } = require('../../services');

/*********************************************************
 ***** Service controller  *****
 *********************************************************/
let servicesController = {};

/**
 * create controller 
 */
servicesController.createService = async (payload) => {
    const Service = await servicesService.createService(payload);

    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: Service });
};

servicesController.getService = async (payload) => {
    const Service = await servicesService.getService({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: Service });
};

servicesController.updateService = async (payload) => {
    try {
        let criteria = { id : payload.id };
        const Service = await servicesService.updateService(criteria,payload);
        return Object.assign(createSuccessResponse(
            CONSTANTS.MESSAGES.SUCCESS
            ), 
            { data: Service });
    }catch (error) {
        console.log(error);
    }
};

servicesController.removeService = async (payload) => {
    let criteria = { id : payload.id };
    const Service = await servicesService.removeService(criteria);
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: Service });
};

servicesController.getServices = async (payload) => {
    const Service = await servicesService.getServices({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: Service });
};

module.exports = servicesController;
