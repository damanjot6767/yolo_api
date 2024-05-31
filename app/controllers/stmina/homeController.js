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
const {userService, homeService } = require('../../services');

/*********************************************************
 ***** home controller  *****
 *********************************************************/
let homeController = {};

/**
 * create controller 
 */
homeController.createHome = async (payload) => {
    const home = await homeService.createHome(payload);

    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: home });
};

homeController.getHome = async (payload) => {
    const home = await homeService.getHome({ id: payload.id });

    if(!home) return createErrorResponse(CONSTANTS.MESSAGES.NOT_FOUND, CONSTANTS.ERROR_TYPES.DATA_NOT_FOUND);

    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: home });
};

homeController.updateHome = async (payload) => {
    try {
        let criteria = { id : payload.id };
        const home = await homeService.updateHome(criteria,payload);
        return Object.assign(createSuccessResponse(
            CONSTANTS.MESSAGES.SUCCESS
            ), 
            { data: home });
    }catch (error) {
        console.log(error);
    }
};

homeController.removeHome = async (payload) => {
    let criteria = { id : payload.id };
    const home = await homeService.removeHome(criteria);
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: home });
};

homeController.getHomes = async (payload) => {
    const home = await homeService.getHomes({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: home });
};

module.exports = homeController;
