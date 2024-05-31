
const { categoryModel
} = require(`../../models`);
const { Sequelize, Op } = require('sequelize');
const { TYPE, PACKAGE_TYPE, MESSAGES } = require('../../utils/constants');
const _ = require("lodash");
const { createErrorResponse } = require('../../helpers/stmina/common/resHelper');
const commonFunctions = require('../../utils/utils');

let categoryService = {};

/**
 * function to create new category to the system.
 * @param {*} payload 
 * @returns 
 */
categoryService.createCategory = async (payload) => {
    try {
        let category = await categoryModel.create(payload);
        return category
    } catch (err) {
        throw err;
    }
};

/**
 * function to fetch category from the system.
 * @param {*} criteria 
 * @returns 
 */
categoryService.getCategory = async (criteria) => {
    return await categoryModel.findOne({ where: criteria })
};

/**
 * function to update category data in the database.
 */
categoryService.updateCategory = async (criteria, payload) => {
    try {
        let category = await categoryModel.update(payload, { where: criteria });
        return category;
    } catch (err) {
        throw err;
    }
};

/**
 * function to remove category from system.
 * @param {*} criteria 
 * @returns 
 */
categoryService.removeCategory = async (criteria) => {
    return await categoryModel.destroy({ where: criteria });
};

/**
 * function to get All category from system.
 * @param {*} criteria 
 * @returns 
 */
categoryService.getCategories = async (payload) => {
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
    return await categoryModel.findAndCountAll(query);
};


module.exports = categoryService;
