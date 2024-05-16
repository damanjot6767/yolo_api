"use strict";

const path = require('path');
const HELPERS = require("../../helpers");
const { MESSAGES, ERROR_TYPES } = require('../../utils/constants');
const SERVICES = require('../../services');
const CONFIG = require('../../../config');
const { sendEmail, checkEmail } = require("../../utils/utils");

/**********************************
 ***** File Upload controller *****
 **********************************/
let fileUploadController = {};

/**
 * function to upload file to the system.
 */
fileUploadController.upload = async (payload) => {
    let pathToUpload = path.resolve(__dirname + `../../../..${CONFIG.PATH_TO_UPLOAD_FILES_ON_LOCAL}`);
    let fileName = await SERVICES.fileUploadService.uploadFile(payload, pathToUpload);
    return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.FILE_UPLOADED_SUCCESSFULLY), 
    { fileUrl: CONFIG.BASE_API_URL+CONFIG.PATH_TO_UPLOAD_FILES_ON_LOCAL+fileName });
};

/* export fileUploadController */
module.exports = fileUploadController;