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
const { roomService } = require('../../services');

/*********************************************************
 ***** room controller  *****
 *********************************************************/
let roomController = {};

/**
 * create controller 
 */
roomController.createRoom = async (payload) => {
    const room = await roomService.createRoom(payload);

    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: room });
};

roomController.getRoom = async (payload) => {
    const room = await roomService.getRoom({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: room });
};

roomController.updateRoom = async (payload) => {
    try {
        let criteria = { id : payload.id };
        const room = await roomService.updateRoom(criteria,payload);
        return Object.assign(createSuccessResponse(
            CONSTANTS.MESSAGES.SUCCESS
            ), 
            { data: room });
    }catch (error) {
        console.log(error);
    }
};

roomController.removeRoom = async (payload) => {
    let criteria = { id : payload.id };
    const room = await roomService.removeRoom(criteria);
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: room });
};

roomController.getRooms = async (payload) => {
    const rooms = await roomService.getRooms({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: rooms });
};

module.exports = roomController;
