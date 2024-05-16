'use strict';

const { Sequelize } = require('sequelize');

module.exports = function (connection) {
    let tags = connection.define("tags", {
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

    return tags;
};