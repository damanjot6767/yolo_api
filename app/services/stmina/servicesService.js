
const { aboutModel, serviceModel
} = require(`../../models`);
const { Sequelize, Op } = require('sequelize');
const { TYPE, PACKAGE_TYPE, MESSAGES } = require('../../utils/constants');
const _ = require("lodash");
const { createErrorResponse } = require('../../helpers/stmina/common/resHelper');
const commonFunctions = require('../../utils/utils');

let servicesService = {};

/**
 * function to create new Service to the system.
 * @param {*} payload 
 * @returns 
 */
servicesService.createService = async (payload) => {
    try {
        let service = await serviceModel.create(payload);
        return service
    } catch (err) {
        throw err;
    }
};

/**
 * function to fetch service from the system.
 * @param {*} criteria 
 * @returns 
 */
servicesService.getService = async (criteria) => {
    return await serviceModel.findOne({ where: criteria })
};

/**
 * function to update service data in the database.
 */
servicesService.updateService = async (criteria, payload) => {
    try {
        let service = await serviceModel.update(payload, { where: criteria });
        return service;
    } catch (err) {
        throw err;
    }
};

/**
 * function to remove Service from system.
 * @param {*} criteria 
 * @returns 
 */
servicesService.removeService = async (criteria) => {
    return await serviceModel.destroy({ where: criteria });
};

/**
 * function to get All Services from system.
 * @param {*} criteria 
 * @returns 
 */
servicesService.getServices = async (payload) => {
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
    return await serviceModel.findAndCountAll(query);
};


module.exports = servicesService;
