
const { pageModel
} = require(`../../models`);
const { Sequelize, Op } = require('sequelize');
const { TYPE, PACKAGE_TYPE, MESSAGES } = require('../../utils/constants');
const _ = require("lodash");
const { createErrorResponse } = require('../../helpers/stmina/common/resHelper');
const commonFunctions = require('../../utils/utils');

let pageService = {};

/**
 * function to create new page to the system.
 * @param {*} payload 
 * @returns 
 */
pageService.createPage = async (payload) => {
    try {
        let page = await pageModel.create(payload);
        return page
    } catch (err) {
        throw err;
    }
};

/**
 * function to fetch page from the system.
 * @param {*} criteria 
 * @returns 
 */
pageService.getPage = async (criteria) => {
    const page = await pageModel.findOne({ where: criteria })
};

/**
 * function to update page data in the database.
 */
pageService.updatePage = async (criteria, payload) => {
    try {
        let page = await pageModel.update(payload, { where: criteria });
        return page;
    } catch (err) {
        throw err;
    }
};

/**
 * function to remove page from system.
 * @param {*} criteria 
 * @returns 
 */
pageService.removePage = async (criteria) => {
    return await pageModel.destroy({ where: criteria });
};

/**
 * function to get All page from system.
 * @param {*} criteria 
 * @returns 
 */
pageService.getPages = async (payload) => {
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
    return await pageModel.findAndCountAll(query);
};


module.exports = pageService;
