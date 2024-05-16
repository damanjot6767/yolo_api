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
const { tagService } = require('../../services');

/*********************************************************
 ***** tag controller  *****
 *********************************************************/
let tagController = {};

/**
 * create controller 
 */
tagController.createTag = async (payload) => {
    const tag = await tagService.createTag(payload);

    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: tag });
};

tagController.getTag = async (payload) => {
    const tag = await tagService.getTag({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: tag });
};

tagController.updateTag = async (payload) => {
    try {
        let criteria = { id : payload.id };
        const tag = await tagService.updateTag(criteria,payload);
        return Object.assign(createSuccessResponse(
            CONSTANTS.MESSAGES.SUCCESS
            ), 
            { data: tag });
    }catch (error) {
        console.log(error);
    }
};

tagController.removeTag = async (payload) => {
    let criteria = { id : payload.id };
    const tag = await tagService.removeTag(criteria);
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: tag });
};

tagController.getTags = async (payload) => {
    const tag = await tagService.getTags({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: tag });
};

module.exports = tagController;
