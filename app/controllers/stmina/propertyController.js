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
const { propertyService } = require('../../services');

/*********************************************************
 ***** property controller  *****
 *********************************************************/
let propertyController = {};

/**
 * create controller 
 */
propertyController.createProperty = async (payload) => {
    const property = await propertyService.createProperty(payload);

    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: property });
};

propertyController.getProperty = async (payload) => {
    const property = await propertyService.getProperty({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: property });
};

propertyController.updateProperty = async (payload) => {
    try {
        let criteria = { id : payload.id };
        const property = await propertyService.updateProperty(criteria,payload);
        return Object.assign(createSuccessResponse(
            CONSTANTS.MESSAGES.SUCCESS
            ), 
            { data: property });
    }catch (error) {
        console.log(error);
    }
};

propertyController.removeProperty = async (payload) => {
    let criteria = { id : payload.id };
    const property = await propertyService.removeProperty(criteria);
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: property });
};

propertyController.getProperties = async (payload) => {
    const property = await propertyService.getProperties({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: property });
};

module.exports = propertyController;
