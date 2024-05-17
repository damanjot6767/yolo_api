'use strict';

const { Sequelize } = require('sequelize');

module.exports = function (connection) {
    let about = connection.define("abouts", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },
        images: {
            type: Sequelize.DataTypes.JSON,
            defaultValue: []
        },
        awards: {
            type: Sequelize.DataTypes.JSON,
            defaultValue: []
        },
        coordinates: {
            type: Sequelize.DataTypes.JSON
        },
        contactNo: {
            type: Sequelize.DataTypes.BIGINT
        },
        email: { 
            type: Sequelize.DataTypes.STRING, 
            unique: true, 
            allowNull: false
        },
        socialLinks : {
            type: Sequelize.DataTypes.JSON,
            defaultValue: []
        },
        isCover: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: true
    });

    return about;
};