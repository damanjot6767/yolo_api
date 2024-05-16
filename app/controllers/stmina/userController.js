"use strict";
const {
    responseHelper:{
        createSuccessResponse,
        createErrorResponse
    }
} = require("../../helpers");
const CONSTANTS = require('../../utils/constants');
const { MESSAGES, ERROR_TYPES } = require('../../utils/constants');
const utils = require(`../../utils/utils`);
const {userService } = require('../../services');

/*********************************************************
 ***** User/Auth controller for authentication logic *****
 *********************************************************/
let userController = {};

/**
 * login controller 
 */
userController.login = async (payload) => {
    try {
        let criteria = {
            email: payload.email,
            // isDeleted: false
        };
    
    
        let user = await userService.getUser(criteria, {}, true, ['id'], false);
    
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

userController.createUser = async (payload) => {
    let isExists = false;
    if(payload.email ) 
    isExists = await userService.getUser({ email: payload.email });
    if (isExists) {
        throw createErrorResponse(MESSAGES.USER_ALREADY_EXISTS, ERROR_TYPES.ALREADY_EXISTS);
    }
    const user = await userService.createUser(payload);

    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: user });
};

userController.getUser = async (payload) => {
    const user = await userService.getUser({ id: payload.id });
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: user });
};

userController.updateUser = async (payload) => {
    try {
        let criteria = { id : payload.id };
        const user = await userService.updateUser(criteria,payload);

        return Object.assign(createSuccessResponse(
            CONSTANTS.MESSAGES.SUCCESS
            ), 
            { data: user });
    }catch (error) {
        console.log(error);
    }
};

userController.removeUser = async (payload) => {
    let criteria = { id : payload.id };
    const user = await userService.removeUser(criteria);
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: user });
};

userController.forgotPassword = async (payload) => {
    const user = await userService.forgotPassword(payload);
    return Object.assign(createSuccessResponse(
        CONSTANTS.MESSAGES.SUCCESS
        ), 
        { data: user });
};


module.exports = userController;
