
const { homeModel
} = require(`../../models`);
const { Sequelize, Op } = require('sequelize');
const { TYPE, PACKAGE_TYPE, MESSAGES } = require('../../utils/constants');
const _ = require("lodash");
const { createErrorResponse } = require('../../helpers/stmina/common/resHelper');
const commonFunctions = require('../../utils/utils');

let homeService = {};

/**
 * function to create new Home to the system.
 * @param {*} payload 
 * @returns 
 */
homeService.createHome = async (payload) => {
    try {
        let Home = await homeModel.create(payload);
        return Home
    } catch (err) {
        throw err;
    }
};

/**
 * function to fetch Home from the system.
 * @param {*} criteria 
 * @returns 
 */
homeService.getHome = async (criteria) => {
    return await homeModel.findOne({ where: criteria });
};

/**
 * function to update Home data in the database.
 */
homeService.updateHome = async (criteria, payload) => {
    try {
        let Home = await homeModel.update(payload, { where: criteria });
        return Home;
    } catch (err) {
        throw err;
    }
};

/**
 * function to remove Home from system.
 * @param {*} criteria 
 * @returns 
 */
homeService.removeHome = async (criteria) => {
    return await homeModel.destroy({ where: criteria });
};

/**
 * function to get All Home from system.
 * @param {*} criteria 
 * @returns 
 */
homeService.getHomes = async (payload) => {
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
    return await homeModel.findAndCountAll(query);
};


module.exports = homeService;
