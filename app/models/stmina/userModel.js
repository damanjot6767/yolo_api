'use strict';

const { Sequelize } = require('sequelize');
const commonFunctions = require('../../utils/utils');
const { TYPE, USER_ROLES } = require('../../utils/constants');

module.exports = function (connection) {
    let users = connection.define("users", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: { type: Sequelize.DataTypes.STRING, unique: true, allowNull: false},
        image: { type: Sequelize.DataTypes.JSON, defaultValue: null },
        name: { type: Sequelize.DataTypes.STRING, allowNull: false },
        role: { type: Sequelize.DataTypes.INTEGER, defaultValue: USER_ROLES.USER },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
            set(value) {
                this.setDataValue('password', commonFunctions.hashPassword(value));
            }
        },
        status: {
            type: Sequelize.DataTypes.STRING,
            values: [...Object.values(TYPE)],
            defaultValue: "active"
        },
    }, {
        timestamps: true
    });

    return users;
};