'use strict';
const jwt = require('jsonwebtoken');
const { MESSAGES, ERROR_TYPES, SECURITY, AVAILABLE_AUTHS   } = require('../../utils/constants');
const HELPERS = require("../../helpers");
const sessionService = require(`./sessionService`);
const adminService = require('./adminService');
const MODELS = require(`../../models`);

let authService = {};

/**
 * function to authenticate user.
 */
authService.userValidate = (userRoles = []) => {
    return (request, response, next) => {
        validateUser(request, userRoles).then((isAuthorized) => {
            if (isAuthorized) {
                return next();
            }
            let responseObject = HELPERS.responseHelper.createErrorResponse(MESSAGES.UNAUTHORIZED, ERROR_TYPES.UNAUTHORIZED);
            return response.status(responseObject.statusCode).json(responseObject);
        }).catch((err) => {
            let responseObject = HELPERS.responseHelper.createErrorResponse(MESSAGES.UNAUTHORIZED, ERROR_TYPES.UNAUTHORIZED);
            return response.status(responseObject.statusCode).json(responseObject);
        });
    };
};


/**
 * function to validate user's jwt token and fetch its details from the system. 
 * @param {} request 
 */
let validateUser = async (request) => {
    try {
        let decodedToken = jwt.verify(request.headers.authorization, SECURITY.JWT_SIGN_KEY);
        let query = {
            where: {id: decodedToken.userId},
            attributes: ['id','email'],
            raw: true
        };
        let authenticatedUser = await MODELS.userModel.findOne(query);

        if (authenticatedUser) {
            request.user = authenticatedUser;
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
};

/**
 * function to authenticate user.
 */
authService.driverValidate = (userRoles = []) => {
    return (request, response, next) => {
        validateDriver(request, userRoles).then((isAuthorized) => {
            if (isAuthorized) {
                return next();
            }
            let responseObject = HELPERS.responseHelper.createErrorResponse(MESSAGES.UNAUTHORIZED, ERROR_TYPES.UNAUTHORIZED);
            return response.status(responseObject.statusCode).json(responseObject);
        }).catch((err) => {
            let responseObject = HELPERS.responseHelper.createErrorResponse(MESSAGES.UNAUTHORIZED, ERROR_TYPES.UNAUTHORIZED);
            return response.status(responseObject.statusCode).json(responseObject);
        });
    };
};


/**
 * function to validate user's jwt token and fetch its details from the system. 
 * @param {} request 
 */
let validateDriver = async (request) => {
    try {
        let decodedToken = jwt.verify(request.headers.authorization, SECURITY.JWT_SIGN_KEY);
        let query = {
            where: {id: decodedToken.driverId},
            attributes: ['id','email'],
            raw: true
        };
        let authenticatedUser = await MODELS.driversModel.findOne(query);

        if (authenticatedUser) {
            request.user = authenticatedUser;
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
};


/**
 * function to authenticate admin.
 */
authService.adminValidate = (userRoles = []) => {
    return (request, response, next) => {
        validateAdmin(request, userRoles).then((isAuthorized) => {
            if (isAuthorized) {
                return next();
            }
            let responseObject = HELPERS.responseHelper.createErrorResponse(MESSAGES.UNAUTHORIZED, ERROR_TYPES.UNAUTHORIZED);
            return response.status(responseObject.statusCode).json(responseObject);
        }).catch((err) => {
            let responseObject = HELPERS.responseHelper.createErrorResponse(MESSAGES.UNAUTHORIZED, ERROR_TYPES.UNAUTHORIZED);
            return response.status(responseObject.statusCode).json(responseObject);
        });
    };
};


/**
 * function to validate admin's jwt token and fetch its details from the system. 
 * @param {} request 
 */
let validateAdmin = async (request) => {
    try {
        let decodedToken = jwt.verify(request.headers.authorization, SECURITY.JWT_SIGN_KEY);

        if(decodedToken.role===AVAILABLE_AUTHS.SUPER_ADMIN){
            let query = {
                where: {id: decodedToken.userId, role: decodedToken.role},
                attributes: ['id','email'],
                raw: true
            };
            let authenticatedUser = await MODELS.userModel.findOne(query);
    
            if (authenticatedUser) {
                request.user = authenticatedUser;
                return true;
            }
            return false;
        }
        else{
            return false
        }
    } catch (err) {
        return false;
    }
};


/**
 * function to validate user's token from asthma server if it is valid or not.
 */
authService.validateToken = async (token) => {
    let isValidToken = true;
    return isValidToken;
};

module.exports = authService;