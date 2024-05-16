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
const { roomReviewService } = require('../../services');

/*********************************************************
 ***** roomReview controller  *****
 *********************************************************/
let roomReviewController = {};

/**
 * create controller 
 */
roomReviewController.createRoomReview = async (payload) => {
    const roomReview = await roomReviewService.createRoomReview(payload);

    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: roomReview });
};

roomReviewController.getRoomReview = async (payload) => {
    const roomReview = await roomReviewService.getRoomReview({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: roomReview });
};

roomReviewController.updateRoomReview = async (payload) => {
    try {
        let criteria = { id : payload.id };
        const roomReview = await roomReviewService.updateRoomReview(criteria,payload);
        return Object.assign(createSuccessResponse(
            CONSTANTS.MESSAGES.SUCCESS
            ), 
            { data: roomReview });
    }catch (error) {
        console.log(error);
    }
};

roomReviewController.removeRoomReview = async (payload) => {
    let criteria = { id : payload.id };
    const roomReview = await roomReviewService.removeRoomReview(criteria);
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: roomReview });
};

roomReviewController.getRoomReviews = async (payload) => {
    const roomReview = await roomReviewService.getRoomReviews({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: roomReview });
};

module.exports = roomReviewController;
