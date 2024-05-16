'use strict';

const { Sequelize } = require('sequelize');
const commonFunctions = require('../../utils/utils');

module.exports = function (connection) {
    let forgotPasswordsModels = connection.define("forgotPasswords", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
            allowNull: false,
        },
        otp: {
            type: Sequelize.DataTypes.INTEGER
        },
    }, {
        timestamps: true
    });

    return forgotPasswordsModels;
};