'use strict';

const { Sequelize } = require('sequelize');

module.exports = function (connection) {
    let page = connection.define("pages", {
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
        }
    }, {
        timestamps: true
    });

    return page;
};