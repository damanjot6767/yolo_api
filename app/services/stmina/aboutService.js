
const { aboutModel
} = require(`../../models`);
const { Sequelize, Op } = require('sequelize');
const { TYPE, PACKAGE_TYPE, MESSAGES } = require('../../utils/constants');
const _ = require("lodash");
const { createErrorResponse } = require('../../helpers/stmina/common/resHelper');
const commonFunctions = require('../../utils/utils');

let aboutService = {};

/**
 * function to create new About to the system.
 * @param {*} payload 
 * @returns 
 */
aboutService.createAbout = async (payload) => {
    try {
        let about = await aboutModel.create(payload);
        return about
    } catch (err) {
        throw err;
    }
};

/**
 * function to fetch about from the system.
 * @param {*} criteria 
 * @returns 
 */
aboutService.getAbout = async (criteria) => {
    return await aboutModel.findOne({ where: criteria })
};

/**
 * function to update About data in the database.
 */
aboutService.updateAbout = async (criteria, payload) => {
    try {
        let about = await aboutModel.update(payload, { where: criteria });
        return about;
    } catch (err) {
        throw err;
    }
};

/**
 * function to remove About from system.
 * @param {*} criteria 
 * @returns 
 */
aboutService.removeAbout = async (criteria) => {
    return await aboutModel.destroy({ where: criteria });
};

/**
 * function to get All About from system.
 * @param {*} criteria 
 * @returns 
 */
aboutService.getAbouts = async (payload) => {
    let query = {};
    let filter = {}
    /**
     * filter section start
     */
    if(payload?.title) {filter['title'] = payload?.title;}
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
    return await aboutModel.findAndCountAll(query);
};


module.exports = aboutService;
