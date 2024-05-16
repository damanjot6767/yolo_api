
const { tagModel
} = require(`../../models`);
const { Sequelize, Op } = require('sequelize');
const { TYPE, PACKAGE_TYPE, MESSAGES } = require('../../utils/constants');
const _ = require("lodash");
const { createErrorResponse } = require('../../helpers/stmina/common/resHelper');
const commonFunctions = require('../../utils/utils');

let tagService = {};

/**
 * function to create new tag to the system.
 * @param {*} payload 
 * @returns 
 */
tagService.createTag = async (payload) => {
    try {
        let tag = await tagModel.create(payload);
        return tag
    } catch (err) {
        throw err;
    }
};

/**
 * function to fetch tag from the system.
 * @param {*} criteria 
 * @returns 
 */
tagService.getTag = async (criteria) => {
    return await tagModel.findOne({ where: criteria })
};

/**
 * function to update tag data in the database.
 */
tagService.updateTag = async (criteria, payload) => {
    try {
        let tag = await tagModel.update(payload, { where: criteria });
        return tag;
    } catch (err) {
        throw err;
    }
};

/**
 * function to remove tag from system.
 * @param {*} criteria 
 * @returns 
 */
tagService.removeTag = async (criteria) => {
    return await tagModel.destroy({ where: criteria });
};

/**
 * function to get All tag from system.
 * @param {*} criteria 
 * @returns 
 */
tagService.getTags = async (payload) => {
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
    return await tagModel.findAndCountAll(query);
};


module.exports = tagService;
