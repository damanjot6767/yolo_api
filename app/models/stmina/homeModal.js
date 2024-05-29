'use strict';

const { Sequelize } = require('sequelize');

module.exports = function (connection) {
    let home = connection.define("homes", {
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
        image: {
            type: Sequelize.DataTypes.JSON,
            defaultValue: null
        }
    }, {
        timestamps: true
    });

    return home;
};