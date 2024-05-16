'use strict';

const { Sequelize } = require('sequelize');
const { ROOM_BED_TYPE } = require('../../utils/constants');

module.exports = function (connection) {
    let services = connection.define("services", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        images: {
            type: Sequelize.DataTypes.JSON,
            defaultValue: []
        },
        icons: {
            type: Sequelize.DataTypes.JSON,
            defaultValue: []
        },
        description: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        }
    }, {
        timestamps: true
    });

    return services;
};