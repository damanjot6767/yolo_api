'use strict';

const MODELS = require(`../../models`);
const utils = require('../../utils/utils');
const _ = require('lodash');
const CONSTANTS = require('../../utils/constants');
const moment = require('moment');
const { userModel, roleModel } = require('../../models');
const { USER_STATUS, USER_ROLES, DAY_TIMES, FILTER_TYPES, TIME_FILTERS, DEVICE_TYPES } = require('../../utils/constants');
const { Sequelize, Op, QueryTypes } = require('sequelize');
const { makeHttpRequest, initializeMongoConnection } = require('../../utils/utils');


let adminService = {};

/**
 * function to get user.
 */
adminService.getUser = async (criteria, attributes = false, withoutJoin = false, roleAttributes = false, raw = true) => {
    //let att = [fn('concat', col('first_name'), ' ', col('last_name')), "FullName"];
    let query = {
        where: criteria,
        ...(attributes && { attributes }),//+ include: 'createdUserData',
        raw
    };
    return await MODELS.userModel.findOne(query);
};

adminService.getUsers = async (payload) => {
    let query = {};
    let filter = {}
    /**
     * filter section start
     */
    if(payload?.name) {filter['name'] = payload?.name;}
    if(payload?.email) {filter['email'] = payload?.email;}
    if(payload?.status) {
        filter['status'] = payload?.status
    }
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
    return await userModel.findAndCountAll(query);
};

module.exports = adminService;