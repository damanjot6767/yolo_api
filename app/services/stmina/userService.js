
const {
    forgotPasswordsModels,
    userModel
} = require(`../../models`);
let userService = {};
const { Sequelize, Op } = require('sequelize');
const { TYPE, PACKAGE_TYPE, MESSAGES } = require('../../utils/constants');
const _ = require("lodash");
const { createErrorResponse } = require('../../helpers/stmina/common/resHelper');
const commonFunctions = require('../../utils/utils');


/**
 * function to create new User to the system.
 * @param {*} payload 
 * @returns 
 */
userService.createUser = async (payload) => {

    const transaction = await global.dbConnection.transaction();
    try {
        let user = await userModel.create(payload,{transaction : transaction});
        await transaction.commit();
        return user
    } catch (err) {
        // Rollback transaction only if the transaction object is defined
        if (transaction) {
            await transaction.rollback()
        };
        throw err;
    }
};

/**
 * function to fetch User from the system.
 * @param {*} criteria 
 * @returns 
 */
userService.getUser = async (criteria) => {
    return await userModel.findOne({ where: criteria })
};

/**
 * function to update User data in the database.
 */
userService.updateUser = async (criteria, payload) => {
    try {
        await userModel.update(payload, { where: criteria});
        let user = userModel.findOne({where: criteria});
        // commit
        return user;
    } catch (err) {
        throw err;
    }
};

/**
 * function to remove User from system.
 * @param {*} criteria 
 * @returns 
 */
userService.removeUser = async (criteria) => {
    return await userModel.destroy({ where: criteria });
};

userService.forgotPassword = async (payload) => {
    let otp = Math.floor(100000 + Math.random() * 900000);
    let user = await userModel.findOne({where : {email: payload.email}, raw:true, attributes:['email', 'id'] });
    let getUser;
    if(user){
        getUser = await forgotPasswordsModels.findOne({where : {user_id: user.id}});
    }
    if(getUser) {
        /**
         * TODO : send otp email
         */
        await commonFunctions.sendNormalEmail(payload.email, otp)
        return await forgotPasswordsModels.update({user_id: user.id, otp},{where: { user_id: user.id}})
    } else {
        await commonFunctions.sendNormalEmail(payload.email, otp)
        return await forgotPasswordsModels.create({user_id: user.id, otp})
    }
};


userService.validateAndResetPassword = async (payload) => {
        let user = await userModel.findOne({where: {email: payload.email}})
        if(!user ){
            throw Object.assign(createErrorResponse(
                MESSAGES.USER_NOT_FOUND,
                'BAD_REQUEST'
                ));
        }
        let optObj = await forgotPasswordsModels.findOne({where: {user_id: user.id}})

        if(payload.password !== payload.repeatPassword){
            throw Object.assign(createErrorResponse(
                MESSAGES.PASSWORD_NOT_MATCH,
                'BAD_REQUEST'
                ));
        }

        if(optObj && optObj.otp.toString() !== payload.otp.toString()) {
            throw Object.assign(createErrorResponse(
                MESSAGES.INVALID_OTP,
                'BAD_REQUEST'
                ));
        }
        let criteria = {
            id: user.id
        }
        let dataToUpdate = {
            password : payload.password
        }
        let resp = await userModel.update(dataToUpdate, { where: criteria });
        if(resp){
            await forgotPasswordsModels.destroy({where: {user_id : user.id}});
        }
        return true;
    }

module.exports = userService;
