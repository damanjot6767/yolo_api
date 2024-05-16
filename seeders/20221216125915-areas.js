'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('areas', [
      {
        id: 1,
        areaName: 'Liverpool',
        description: 'Liverpool',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        id: 2,
        areaName: 'Smithfield',
        description: 'Smithfield',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        id:3,
        areaName: 'Regents Park',
        description: 'Regents Park',
        createdAt : new Date(),
        updatedAt : new Date()
        
      }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('areas', null, {});
  }
};
