const CONFIG = require('../../config');
/********************************
 **** Managing all the services ***
 ********* independently ********
 ********************************/
module.exports = {
    swaggerService: require(`./stmina/swaggerService`),
    fileUploadService: require(`./stmina/fileUploadService`),
    adminService: require('./stmina/adminService'),
    userService: require('./stmina/userService'),
    aboutService: require('./stmina/aboutService'),
    experienceService: require('./stmina/experienceService'),
    servicesService: require('./stmina/servicesService'),
    reviewService: require('./stmina/reviewService'),
    propertyService: require('./stmina/propertyService'),
    categoryService: require('./stmina/categoryService'),
    tagService: require('./stmina/tagService'),
    roomReviewService: require('./stmina/roomReviewService'),
    eventService: require('./stmina/eventService'),
    roomService: require('./stmina/roomService'),
    copyService: require('./stmina/copyService'),
};