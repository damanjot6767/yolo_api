"use strict";
const {
    responseHelper:{
        createSuccessResponse,
        createErrorResponse
    }
} = require("../../helpers");
const { MESSAGES, ERROR_TYPES } = require('../../utils/constants');
const { copyService } = require('../../services');

/*********************************************************
 ***** User/Auth controller for authentication logic *****
 *********************************************************/
let copyController = {};

/**
 * login controller 
 */
copyController.create = async (payload) => {
    try {
        await copyService.create(payload);
        return createSuccessResponse(MESSAGES.SUCCESS);
    } catch (e) {
        return createErrorResponse(MESSAGES.FAILED);
    }
};

copyController.get = async (payload) => {
    const driver = await copyService.get({ id: payload.id });
    return Object.assign(createSuccessResponse(
        MESSAGES.SUCCESS
        ), 
        { data: driver });
};

copyController.getAll = async (payload) => {
    const result = await copyService.getAll(payload);
    return Object.assign(createSuccessResponse(
        MESSAGES.SUCCESS
        ), 
        { data: result });
};

copyController.update = async (payload) => {
    let criteria = { id : payload.id };
    const result = await copyService.update(criteria,payload);
    return Object.assign(createSuccessResponse(
        MESSAGES.SUCCESS
        ), 
        { data: result });
};

copyController.remove = async (payload) => {
    let criteria = { id : payload.id };
    const result = await copyService.remove(criteria);
    return Object.assign(createSuccessResponse(
        MESSAGES.SUCCESS
        ), 
        { data: result });
};


module.exports = copyController;
