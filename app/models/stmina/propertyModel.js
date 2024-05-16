'use strict';

const { Sequelize } = require('sequelize');
const { ROOM_BED_TYPE } = require('../../utils/constants');

module.exports = function (connection) {
    let properties = connection.define("properties", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: { 
            type: Sequelize.DataTypes.STRING, 
            unique: true, 
            allowNull: false
        },
        title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        images: {
            type: Sequelize.DataTypes.JSON,
            defaultValue: []
        },
        description: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        coordinates: {
            type: Sequelize.DataTypes.JSON,
            allowNull: false
        },
        contactNo: { 
            type: Sequelize.DataTypes.BIGINT, 
            allowNull: false
        },
    }, {
        timestamps: true
    });

    return properties;
};