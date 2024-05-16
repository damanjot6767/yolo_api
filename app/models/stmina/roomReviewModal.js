'use strict';

const { Sequelize } = require('sequelize');

module.exports = function (connection) {
    let room_reviews = connection.define("room_reviews", {
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
        },
        room_id: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: 'rooms',
                key: 'id'
            },
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

    return room_reviews;
};