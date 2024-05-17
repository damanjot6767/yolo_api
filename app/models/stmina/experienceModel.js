'use strict';

const { Sequelize } = require('sequelize');
const { ROOM_BED_TYPE } = require('../../utils/constants');

module.exports = function (connection) {
    let experiences = connection.define("experiences", {
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
        description: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        timestamps: true
    });

    return experiences;
};