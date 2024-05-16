'use strict';

const { Sequelize } = require('sequelize');
const { ROOM_BED_TYPE } = require('../../utils/constants');

module.exports = function (connection) {
    let rooms = connection.define("rooms", {
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
        price: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        adult: {
            type: Sequelize.DataTypes.JSON,
            allowNull: false
        },
        children: {
            type: Sequelize.DataTypes.JSON,
            allowNull: false
        },
        bookingNight: {
            type: Sequelize.DataTypes.JSON,
            allowNull: false
        },
        bedType: {
            type: Sequelize.DataTypes.STRING,
            values: [...Object.values(ROOM_BED_TYPE)],
            allowNull: false
        },
        roomArea: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },
        coordinates: {
            type: Sequelize.DataTypes.JSON,
            allowNull: false
        },
        service_ids: {
            type: Sequelize.DataTypes.JSON,
            allowNull: false,
            defaultValue: []
        },
        property_id: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: 'properties',
                key: 'id'
            },
            allowNull: false,
        },
    }, {
        timestamps: true
    });

    return rooms;
};