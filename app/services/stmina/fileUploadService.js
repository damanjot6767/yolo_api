const AWS = require('aws-sdk');
const fs = require('fs');
const CONFIG = require('../../../config');
const fileUploadService = {};
AWS.config.update({ accessKeyId: CONFIG.s3Bucket.accessKeyId, secretAccessKey: CONFIG.s3Bucket.secretAccessKey });
let s3Bucket = new AWS.S3();

/**
 * function to upload a file to s3(AWS) bucket.
 */
fileUploadService.uploadFileToS3 = (payload, bucketName) => {
    return new Promise((resolve, reject) => {
        s3Bucket.upload({
            Bucket: bucketName,
            Key: payload.file.originalname,
            Body: payload.file.buffer,
            ACL: 'public-read',
        }, function (err, data) {
            if (err) {
                console.log('Error here', err);
                return reject(err);
            }
            resolve(data);
        });
    });
};

/**
 * function to upload file to local server.
 */
fileUploadService.uploadFileToLocal = async (payload, fileName, pathToUpload) => {
    let directoryPath = pathToUpload ? pathToUpload : path.resolve(__dirname + `../../../..${CONFIG.PATH_TO_UPLOAD_SUBMISSIONS_ON_LOCAL}/${payload.user._id}`);
    // create user's directory if not present.
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
    }
    let fileSavePath = `${directoryPath}/${fileName}`;
    let writeStream = fs.createWriteStream(fileSavePath);
    return new Promise((resolve, reject) => {
        writeStream.write(payload.file.buffer);
        writeStream.on('error', function (err) {
            reject(err);
        });
        writeStream.end(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(fileName);
            }
        });
    });
};

/**
 * function to upload a file on either local server or on s3 bucket.
 */
fileUploadService.uploadFile = async (payload, pathToUpload) => {
    let fileExtension = payload.file.originalname.split('.')[1];
    let fileName = `upload_${Date.now()}.${fileExtension}`, fileUrl = '';
    let UPLOAD_TO_S3 = process.env.UPLOAD_TO_S3 ? process.env.UPLOAD_TO_S3 : '';
    if (UPLOAD_TO_S3.toLowerCase() === 'true') {
        let s3BucketName = CONFIG.s3Bucket.normalFilesPath;
        fileUrl = await fileUploadService.uploadFileToS3(payload, fileName, s3BucketName);
    } else {
        fileUrl = await fileUploadService.uploadFileToLocal(payload, fileName, pathToUpload);
    }
    return `/${fileUrl}`;
};

/**
 * function to remove file.
 * @param {*} filePath 
 * @returns 
 */
fileUploadService.deleteFile = async (filePath) => {
    return fs.unlinkSync(filePath);
};

module.exports = fileUploadService;