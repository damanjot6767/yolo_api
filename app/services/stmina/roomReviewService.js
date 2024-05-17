
const { roomReviewModel, userModel, roomModel
} = require(`../../models`);
const { Sequelize, Op } = require('sequelize');
const { TYPE, PACKAGE_TYPE, MESSAGES } = require('../../utils/constants');
const _ = require("lodash");
const { createErrorResponse } = require('../../helpers/stmina/common/resHelper');
const commonFunctions = require('../../utils/utils');

let roomReviewService = {};

/**
 * function to create new roomReview to the system.
 * @param {*} payload 
 * @returns 
 */
roomReviewService.createRoomReview = async (payload) => {
    try {
        let roomReview = await roomReviewModel.create(payload);
        return roomReview
    } catch (err) {
        throw err;
    }
};

/**
 * function to fetch roomReview from the system.
 * @param {*} criteria 
 * @returns 
 */
roomReviewService.getRoomReview = async (criteria) => {
    return await roomReviewModel.findOne({ 
        where: criteria, 
        include: [
            {
                 model: userModel,
                 as: 'user'
            },
            {
                model: roomModel,
                as: 'room'
            }
        ]})
};

/**
 * function to update roomReview data in the database.
 */
roomReviewService.updateRoomReview = async (criteria, payload) => {
    try {
        let roomReview = await roomReviewModel.update(payload, { where: criteria });
        return roomReview;
    } catch (err) {
        throw err;
    }
};

/**
 * function to remove roomReview from system.
 * @param {*} criteria 
 * @returns 
 */
roomReviewService.removeRoomReview = async (criteria) => {
    return await roomReviewModel.destroy({ where: criteria });
};

/**
 * function to get All roomReview from system.
 * @param {*} criteria 
 * @returns 
 */
roomReviewService.getRoomReviews = async (payload) => {
    let query = {};
    let filter = {}
    /**
     * filter section start
     */
    if(payload?.title) {filter['title'] = payload?.title;}
    if(payload?.rating) {filter['rating'] = payload?.rating;}
    if(payload?.user_id) {filter['user_id'] = payload?.user_id;}
    if(payload?.room_id) {filter['room_id'] = payload?.room_id;}
    if(filter) {
        query["where"] = filter;
    }
    /* filter section end */

    if(payload?.field && payload?.order){
        const orderBy = [
            [payload.field, payload.order]
        ]
        query['order'] = orderBy 
    }
    if(payload?.page && payload?.pageSize){
        const offset = payload.page == 1 ? (payload.page-1) : ((payload.page-1) * payload.pageSize);
        const limit = payload.pageSize;
        query['offset'] = offset;
        query['limit'] = limit
    }

    query['include'] = [
        {
             model: userModel,
             as: 'user'
        },
        {
            model: roomModel,
            as: 'room'
        }
    ]

    query['distinct']= true
    return await roomReviewModel.findAndCountAll(query);
};


module.exports = roomReviewService;
