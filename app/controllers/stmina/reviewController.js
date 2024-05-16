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
const { reviewService } = require('../../services');

/*********************************************************
 ***** review controller  *****
 *********************************************************/
let reviewController = {};

/**
 * create controller 
 */
reviewController.createReview = async (payload) => {
    const review = await reviewService.createReview(payload);

    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: review });
};

reviewController.getReview = async (payload) => {
    const review = await reviewService.getReview({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: review });
};

reviewController.updateReview = async (payload) => {
    try {
        let criteria = { id : payload.id };
        const review = await reviewService.updateReview(criteria,payload);
        return Object.assign(createSuccessResponse(
            CONSTANTS.MESSAGES.SUCCESS
            ), 
            { data: review });
    }catch (error) {
        console.log(error);
    }
};

reviewController.removeReview = async (payload) => {
    let criteria = { id : payload.id };
    const review = await reviewService.removeReview(criteria);
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: review });
};

reviewController.getReviews = async (payload) => {
    const review = await reviewService.getReviews({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: review });
};

module.exports = reviewController;
