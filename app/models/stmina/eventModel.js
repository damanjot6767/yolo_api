'use strict';

const { Sequelize } = require('sequelize');
const { EVENT_TYPE } = require('../../utils/constants');

module.exports = function (connection) {
    let events = connection.define("events", {
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
        eventType: {
            type: Sequelize.DataTypes.STRING,
            values: [...Object.values(EVENT_TYPE)],
            defaultValue: EVENT_TYPE.EVENT
        },
    }, {
        timestamps: true
    });

    return events;
};