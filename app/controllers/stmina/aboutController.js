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
const {userService, aboutService } = require('../../services');

/*********************************************************
 ***** About controller  *****
 *********************************************************/
let aboutController = {};

/**
 * create controller 
 */
aboutController.createAbout = async (payload) => {
    const about = await aboutService.createAbout(payload);

    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: about });
};

aboutController.getAbout = async (payload) => {
    const about = await aboutService.getAbout({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: about });
};

aboutController.updateAbout = async (payload) => {
    try {
        let criteria = { id : payload.id };
        const about = await aboutService.updateAbout(criteria,payload);
        return Object.assign(createSuccessResponse(
            CONSTANTS.MESSAGES.SUCCESS
            ), 
            { data: about });
    }catch (error) {
        console.log(error);
    }
};

aboutController.removeAbout = async (payload) => {
    let criteria = { id : payload.id };
    const about = await aboutService.removeAbout(criteria);
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: about });
};

aboutController.getAbouts = async (payload) => {
    const about = await aboutService.getAbouts({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: about });
};

module.exports = aboutController;
