
const { propertyModel
} = require(`../../models`);
const { Sequelize, Op } = require('sequelize');
const { TYPE, PACKAGE_TYPE, MESSAGES } = require('../../utils/constants');
const _ = require("lodash");
const { createErrorResponse } = require('../../helpers/stmina/common/resHelper');
const commonFunctions = require('../../utils/utils');

let propertyService = {};

/**
 * function to create new property to the system.
 * @param {*} payload 
 * @returns 
 */
propertyService.createProperty = async (payload) => {
    try {
        let property = await propertyModel.create(payload);
        return property
    } catch (err) {
        throw err;
    }
};

/**
 * function to fetch property from the system.
 * @param {*} criteria 
 * @returns 
 */
propertyService.getProperty = async (criteria) => {
    return await propertyModel.findOne({ where: criteria })
};

/**
 * function to update property data in the database.
 */
propertyService.updateProperty = async (criteria, payload) => {
    try {
        let property = await propertyModel.update(payload, { where: criteria });
        return property;
    } catch (err) {
        throw err;
    }
};

/**
 * function to remove property from system.
 * @param {*} criteria 
 * @returns 
 */
propertyService.removeProperty = async (criteria) => {
    return await propertyModel.destroy({ where: criteria });
};

/**
 * function to get All property from system.
 * @param {*} criteria 
 * @returns 
 */
propertyService.getProperties = async (payload) => {
    let query = {};
    let filter = {}
    /**
     * filter section start
     */
    if(payload?.email) {filter['email'] = payload?.email;}
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
    return await propertyModel.findAndCountAll(query);
};


module.exports = propertyService;
