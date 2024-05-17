'use strict';

const { Sequelize } = require('sequelize');
const CONFIG = require('../../config');
const dbUtils = require('../utils/dbUtils');
const mysql2 = require('mysql2');

const connection = new Sequelize(CONFIG.SQL.DB_NAME, CONFIG.SQL.USERNAME, CONFIG.SQL.PASSWORD, {
	host: CONFIG.SQL.HOST,
	dialect: "mysql",
	dialectModule: mysql2,
	logging: false,
	dialectOptions: {
		connectTimeout: 60000
	}
});

/**
 * requiring models
 */
let models = {
	user: require("../models/stmina/userModel")(connection),
	about: require("../models/stmina/aboutModal")(connection),
	room: require("../models/stmina/roomModal")(connection),
	property: require("../models/stmina/propertyModel")(connection),
	service: require("../models/stmina/serviceModel")(connection),
	experience: require("../models/stmina/experienceModel")(connection),
	review: require("../models/stmina/reviewModal")(connection),
	post: require("../models/stmina/postModel")(connection),
	category: require("../models/stmina/categoryModel")(connection),
	tag: require("../models/stmina/tagModel")(connection),
	event: require("../models/stmina/eventModel")(connection),
	roomReview: require("../models/stmina/roomReviewModal")(connection),
	forgotPasswordsModel: require("../models/stmina/forgotPasswordModel")(connection)
}

/**
 * association of all tables
 */
Object.keys(models).forEach(model => {
	if (models[model].associate) {
		models[model].associate(models)
	}
});

// models.user.belongsTo(models.hospital, { foreignKey: 'hospitalId', as: 'hospitalData' })

/**
 * connection authentication
 */
connection
	.authenticate()
	.then(() => {
		console.log(`'${CONFIG.SQL.DB_NAME}' database connected`);
	})
	.catch(err => {
		console.error("Unable to connect to the database:", err);
	});

/**
 * connection syncing
 */
connection
	.sync({
		alter: true
	})
	.then(async () => {
		// add initial data
		await dbUtils.addInitialData(models);
		console.log('Tables created and updated with initial data.');
	})
	.catch(err => {
		console.error("Unable to create tables", err);
	});
	
global.dbConnection = connection;

module.exports = connection;