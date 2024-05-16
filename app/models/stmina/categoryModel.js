'use strict';

const { Sequelize } = require('sequelize');

module.exports = function (connection) {
    let categories = connection.define("categories", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true
    });

    return categories;
};