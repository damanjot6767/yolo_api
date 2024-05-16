
const { 
    reviewModel
} = require(`../../models`);
const { Sequelize, Op } = require('sequelize');
const { TYPE, PACKAGE_TYPE, MESSAGES } = require('../../utils/constants');
const _ = require("lodash");
const { createErrorResponse } = require('../../helpers/stmina/common/resHelper');
const commonFunctions = require('../../utils/utils');

let reviewService = {};

/**
 * function to create new review to the system.
 * @param {*} payload 
 * @returns 
 */
reviewService.createReview = async (payload) => {
    try {
        let review = await reviewModel.create(payload);
        return review
    } catch (err) {
        throw err;
    }
};

/**
 * function to fetch review from the system.
 * @param {*} criteria 
 * @returns 
 */
reviewService.getReview = async (criteria) => {
    return await reviewModel.findOne({ where: criteria })
};

/**
 * function to update review data in the database.
 */
reviewService.updateReview = async (criteria, payload) => {
    try {
        let review = await reviewModel.update(payload, { where: criteria });
        return review;
    } catch (err) {
        throw err;
    }
};

/**
 * function to remove review from system.
 * @param {*} criteria 
 * @returns 
 */
reviewService.removeReview = async (criteria) => {
    return await reviewModel.destroy({ where: criteria });
};

/**
 * function to get All review from system.
 * @param {*} criteria 
 * @returns 
 */
reviewService.getReviews = async (payload) => {
    let query = {};
    let filter = {}
    /**
     * filter section start
     */
    if(payload?.title) {filter['title'] = payload?.title;}
    if(payload?.rating) {filter['rating'] = payload?.rating;}
    if(payload?.user_id) {filter['user_id'] = payload?.user_id;}
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
    
    query['distinct']= true
    return await reviewModel.findAndCountAll(query);
};


module.exports = reviewService;
