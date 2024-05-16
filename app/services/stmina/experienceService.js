
const { 
    experienceModel,
} = require(`../../models`);
const { Sequelize, Op } = require('sequelize');
const { TYPE, PACKAGE_TYPE, MESSAGES } = require('../../utils/constants');
const _ = require("lodash");
const { createErrorResponse } = require('../../helpers/stmina/common/resHelper');
const commonFunctions = require('../../utils/utils');

let experienceService = {};

/**
 * function to create new experience to the system.
 * @param {*} payload 
 * @returns 
 */
experienceService.createExperience = async (payload) => {
    try {
        let experience = await experienceModel.create(payload);
        return experience
    } catch (err) {
        throw err;
    }
};

/**
 * function to fetch experience from the system.
 * @param {*} criteria 
 * @returns 
 */
experienceService.getExperience = async (criteria) => {
    return await experienceModel.findOne({ where: criteria })
};

/**
 * function to update experience data in the database.
 */
experienceService.updateExperience = async (criteria, payload) => {
    try {
        let experience = await experienceModel.update(payload, { where: criteria });
        return experience;
    } catch (err) {
        throw err;
    }
};

/**
 * function to remove experience from system.
 * @param {*} criteria 
 * @returns 
 */
experienceService.removeExperience = async (criteria) => {
    return await experienceModel.destroy({ where: criteria });
};

/**
 * function to get All experience from system.
 * @param {*} criteria 
 * @returns 
 */
experienceService.getExperiences = async (payload) => {
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
    return await experienceModel.findAndCountAll(query);
};


module.exports = experienceService;
