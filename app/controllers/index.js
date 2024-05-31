'use strict';
const CONFIG = require('../../config');
/********************************
 **** Managing all the controllers ***
 ********* independently ********
 ********************************/
module.exports = {
    fileUploadController: require(`./stmina/fileUploadController`),
    adminController: require('./stmina/adminController'),
    sentMailController: require('./stmina/sentMailController'),
    pageController: require('./stmina/pageController'),
    homeController: require('./stmina/homeController'),
    userController: require('./stmina/userController'),
    aboutController: require('./stmina/aboutController'),
    servicesController: require('./stmina/servicesController'),
    experienceController: require('./stmina/experienceController'),
    reviewController: require('./stmina/reviewController'),
    propertyController: require('./stmina/propertyController'),
    categoryController: require('./stmina/categoryController'),
    tagController: require('./stmina/tagController'),
    roomReviewController: require('./stmina/roomReviewController'),
    eventController: require('./stmina/eventController'),
    roomController: require('./stmina/roomController'),
};
