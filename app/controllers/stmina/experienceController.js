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
const { experienceService } = require('../../services');

/*********************************************************
 ***** experience controller  *****
 *********************************************************/
let experienceController = {};

/**
 * create controller 
 */
experienceController.createExperience = async (payload) => {
    const experience = await experienceService.createExperience(payload);

    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: experience });
};

experienceController.getExperience = async (payload) => {
    const experience = await experienceService.getExperience({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: experience });
};

experienceController.updateExperience = async (payload) => {
    try {
        let criteria = { id : payload.id };
        const experience = await experienceService.updateExperience(criteria,payload);
        return Object.assign(createSuccessResponse(
            CONSTANTS.MESSAGES.SUCCESS
            ), 
            { data: experience });
    }catch (error) {
        console.log(error);
    }
};

experienceController.removeExperience = async (payload) => {
    let criteria = { id : payload.id };
    const experience = await experienceService.removeExperience(criteria);
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: experience });
};

experienceController.getExperiences = async (payload) => {
    const experience = await experienceService.getExperiences({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: experience });
};

module.exports = experienceController;
