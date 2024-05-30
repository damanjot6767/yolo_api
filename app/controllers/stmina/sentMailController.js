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

/*********************************************************
 ***** About controller  *****
 *********************************************************/
let sentMailController = {};

/**
 * create controller 
 */
sentMailController.sentNormalMail = async (payload) => {
    try {
        const about = await utils.sendNormalEmail(payload);

        return Object.assign(createSuccessResponse(
            CONSTANTS.MESSAGES.SUCCESS
            ), 
            { data: about });
    } catch (err) {
        let error = utils.convertErrorIntoReadableForm(err);
        return Object.assign(createErrorResponse(error?.message?.toString() || "something went wrong while send message", CONSTANTS.ERROR_TYPES.BAD_REQUEST))
    }
};


module.exports = sentMailController;
