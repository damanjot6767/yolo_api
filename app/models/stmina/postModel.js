'use strict';

const { Sequelize } = require('sequelize');
const { ROOM_BED_TYPE } = require('../../utils/constants');

module.exports = function (connection) {
    let posts = connection.define("posts", {
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
        message: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
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
        category_ids: {
            type: Sequelize.DataTypes.JSON,
            defaultValue: []
        },
    }, {
        timestamps: true
    });

    return posts;
};