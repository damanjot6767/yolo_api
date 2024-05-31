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
const {pageService } = require('../../services');

/*********************************************************
 ***** page controller  *****
 *********************************************************/
let pageController = {};

/**
 * create controller 
 */
pageController.createPage = async (payload) => {
    const page = await pageService.createPage(payload);

    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: page });
};

pageController.getPage = async (payload) => {
    const page = await pageService.getPage({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: page });
};

pageController.updatePage = async (payload) => {
    try {
        let criteria = { id : payload.id };
        const page = await pageService.updatePage(criteria,payload);
        return Object.assign(createSuccessResponse(
            CONSTANTS.MESSAGES.SUCCESS
            ), 
            { data: page });
    }catch (error) {
        console.log(error);
    }
};

pageController.removePage = async (payload) => {
    let criteria = { id : payload.id };
    const page = await pageService.removePage(criteria);
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: page });
};

pageController.getPages = async (payload) => {
    const page = await pageService.getPages({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: page });
};

module.exports = pageController;
