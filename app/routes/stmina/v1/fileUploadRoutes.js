'use strict';

const { Joi } = require('../../../utils/joiUtils');

//load controllers
const { fileUploadController } = require(`../../../controllers`);
const { AVAILABLE_AUTHS } = require('../../../utils/constants');

let routes = [
    {
        path: '/v1/fileUpload',
        method: 'POST',
        joiSchemaForSwagger: {
            // headers: {
            //     authorization: Joi.string().required()
            // },
            formData: {
                file: Joi.any().meta({ swaggerType: 'file' }).required().description('image file'),
            },
            group: 'File',
            description: 'Route to upload file',
            model: 'FileUpload'
        },
        auth: [AVAILABLE_AUTHS.SUPER_ADMIN, AVAILABLE_AUTHS.PRIMARY_USER],
        handler: fileUploadController.upload
    }
];

module.exports = routes;




