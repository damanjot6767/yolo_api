"use strict";

const CONFIG = require('../../../config');
const {
    responseHelper:{
        createSuccessResponse,
        createErrorResponse
    }
} = require("../../helpers");
const CONSTANTS = require('../../utils/constants');
const SERVICES = require('../../services');
const utils = require(`../../utils/utils`);
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { getSortObject } = require('../../utils/dbUtils');
const { sendTemplate, decryptJwt, addDelay } = require('../../utils/utils');
const { adminService } = require('../../services');

/*********************************************************
 ***** Admin/Auth controller for authentication logic *****
 *********************************************************/
let adminController = {};

/**
 * login controller 
 */
adminController.login = async (payload) => {
    try {
        let criteria = {
            email: payload.email,
            // isDeleted: false
        };
    
    
        let user = await adminService.getUser(criteria, {}, true, ['id'], false);
    
        // if user doesn't exist 
        if (!user) {
            return createErrorResponse(CONSTANTS.MESSAGES.INVALID_CREDENTIALS, CONSTANTS.ERROR_TYPES.BAD_REQUEST)
        }
    
    
        if (utils.compareHash(payload.password, user.password)) {
            let accessToken = utils.encryptJwt({
                role: user.role,
                userId: user.id,
                timestamp: new Date()
            })
            let userData = {
                email: user.email,
                id: user.id,
                role: user.role
            };
    
            return Object.assign(createSuccessResponse(CONSTANTS.MESSAGES.LOGGED_IN_SUCCESSFULLY), { data: { accessToken, ...userData, role: user.role } });
        } else {
            return Object.assign(createErrorResponse(CONSTANTS.MESSAGES.INVALID_CREDENTIALS, CONSTANTS.ERROR_TYPES.BAD_REQUEST))
        }
    } catch (e) {
        console.log(e);
    }
}

adminController.getUsers = async (payload) => {
    const user = await adminService.getUsers(payload);
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: user });
};


module.exports = adminController;
