'use strict';

const { Sequelize } = require('sequelize');
const { ROOM_BED_TYPE } = require('../../utils/constants');

module.exports = function (connection) {
    let reviews = connection.define("reviews", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: Sequelize.DataTypes.INTEGER,
            validate: { min: 1, max: 5 },
            defaultValue: 1
        },
        description: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
            allowNull: false,
        },
    }, {
        timestamps: true
    });

    return reviews;
};