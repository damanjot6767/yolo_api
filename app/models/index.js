'use strict';

const MODELS = require('../startup/db').models;
/********************************
 **** Managing all the models ***
 ********* independently ********
 ********************************/
let models = {
    userModel: MODELS.users,
    aboutModel: MODELS.abouts,
    roomModel: MODELS.rooms,
    propertyModel: MODELS.properties,
    serviceModel: MODELS.services,
    experienceModel: MODELS.experiences,
    reviewModel: MODELS.reviews,
    postModel: MODELS.posts,
    categoryModel: MODELS.categories,
    tagModel: MODELS.tags,
    eventModel: MODELS.events,
    roomReviewModel: MODELS.room_reviews,
    forgotPasswordsModels: MODELS.forgotPasswords
};
/**
 * for one to one
 */
// models.driversModel.hasOne(models.expenseModel, { foreignKey: 'driver_id', as: 'driverExpense' });
// models.expenseModel.belongsTo(models.driversModel, { foreignKey: 'driver_id' })


// models.driversModel.hasMany(models.expenseModel, { foreignKey: 'driver_id'});
// models.expenseModel.belongsTo(models.driversModel, { foreignKey: 'driver_id' })

// // models.packagesModel.hasMany(models.areasModel, { foreignKey: 'area_id' });
// models.packagesModel.belongsTo(models.areasModel, { foreignKey: 'area_id' })

// models.areasModel.belongsToMany(models.driversModel, {through : models.driverAreasModel,  foreignKey: 'area_id'})
// models.driversModel.belongsToMany(models.areasModel, {through : models.driverAreasModel,  foreignKey: 'driver_id'})


// models.expenseModel.belongsTo(models.expenseCategoryModel,{foreignKey: "category"})
// models.packagesModel.belongsTo(models.packageCategoryModel,{foreignKey: "packageCategory"})
// models.packagesModel.belongsTo(models.packageTypeModel,{foreignKey: "type"})

// it will work when we apply query on packageModel and driversModel
// models.packagesModel.belongsToMany(models.driversModel, {through : models.customDriverRateModel,  foreignKey: 'package_id'})
// models.driversModel.belongsToMany(models.packagesModel, {through : models.customDriverRateModel,  foreignKey: 'driver_id'})

// models.customDriverRateModel.belongsTo(models.driversModel, {foreignKey:"driver_id"})
// models.customDriverRateModel.belongsTo(models.packagesModel, {foreignKey:"package_id"})
// // models.customDriverRateModel.belongsTo(models.areasModel, {foreignKey:"area_id"}) // not needed, should not be there

// models.dailyEntryModel.belongsTo(models.driversModel, {foreignKey:"driver_id"})
// models.dailyEntryModel.belongsTo(models.packagesModel, {foreignKey:"package_id"})



//----------------------------------------------------------------------new data base relations


//----------------------------------------------------roomModel realtion
models.propertyModel.hasMany(models.roomModel, { foreignKey: 'property_id'});
models.roomModel.belongsTo(models.propertyModel, { foreignKey: 'property_id' });

//----------------------------------------------------reviewModel relation
models.reviewModel.belongsTo(models.userModel, { foreignKey: 'user_id' })

//----------------------------------------------------postModel relation
models.userModel.hasMany(models.postModel, { foreignKey: 'user_id' })
models.postModel.belongsTo(models.userModel, { foreignKey: 'user_id' })

//----------------------------------------------------roomReviewModel relation
models.roomReviewModel.belongsTo(models.userModel, { as: 'user', foreignKey: 'user_id' })

models.roomModel.hasMany(models.roomReviewModel, { foreignKey: 'room_id' })
models.roomReviewModel.belongsTo(models.roomModel, { as: 'room', foreignKey: 'room_id' })





module.exports = models;