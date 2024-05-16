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
const {categoryService } = require('../../services');

/*********************************************************
 ***** category controller  *****
 *********************************************************/
let categoryController = {};

/**
 * create controller 
 */
categoryController.createCategory = async (payload) => {
    const category = await categoryService.createCategory(payload);

    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: category });
};

categoryController.getCategory = async (payload) => {
    const category = await categoryService.getCategory({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: category });
};

categoryController.updateCategory = async (payload) => {
    try {
        let criteria = { id : payload.id };
        const category = await categoryService.updateCategory(criteria,payload);
        return Object.assign(createSuccessResponse(
            CONSTANTS.MESSAGES.SUCCESS
            ), 
            { data: category });
    }catch (error) {
        console.log(error);
    }
};

categoryController.removeCategory = async (payload) => {
    let criteria = { id : payload.id };
    const category = await categoryService.removeCategory(criteria);
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: category });
};

categoryController.getCategories = async (payload) => {
    const category = await categoryService.getCategories({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: category });
};

module.exports = categoryController;
