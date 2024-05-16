'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('packages', [
      {
        id: 1,
        ausPostRate: 1.6066,
        ausPostRateFrom: new Date(),
        description: 'ORDINARY PARCEL',
        driverRate: 1.2,
        packageCategory: 1,
        status: "active",
        type: "A",
        area_id: 1,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        ausPostRate: 1.403,
        ausPostRateFrom: new Date(),
        description: 'ORDINARY EXPRESS',
        driverRate: 1.2,
        packageCategory: 1,
        status: "active",
        type: "A",
        area_id: 2,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        ausPostRate: 1.628,
        ausPostRateFrom: new Date(),
        description: 'ORDINARY PARCELS',
        driverRate: 1.2,
        packageCategory: 1,
        status: "active",
        type: "A",
        area_id: 3,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: 4,
        ausPostRate: 1.8531,
        ausPostRateFrom: new Date(),
        description: 'SIGNATURE ITEMS',
        driverRate: 1.2,
        packageCategory: 1,
        status: "active",
        type: "B",
        area_id: 1,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        ausPostRate: 2.746,
        ausPostRateFrom: new Date(),
        description: 'SIGNATURE ITEMS',
        driverRate: 1.2,
        packageCategory: 1,
        status: "active",
        type: "B",
        area_id: 2,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        ausPostRate: 2.2,
        ausPostRateFrom: new Date(),
        description: 'SIGNATURE ITEMS',
        driverRate: 1.2,
        packageCategory: 1,
        status: "active",
        type: "B",
        area_id: 3,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: 7,
        ausPostRate: 10.0,
        ausPostRateFrom: new Date(),
        description: 'EPARCEL',
        driverRate: 1.2,
        packageCategory: 1,
        status: "active",
        type: "D",
        area_id: 1,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        ausPostRate: 2.0746,
        ausPostRateFrom: new Date(),
        description: 'EPARCEL',
        driverRate: 1.2,
        packageCategory: 1,
        status: "active",
        type: "D",
        area_id: 2,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        ausPostRate: 2.2,
        ausPostRateFrom: new Date(),
        description: 'EPARCEL',
        driverRate: 1.2,
        packageCategory: 1,
        status: "active",
        type: "D",
        area_id: 3,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },


      {
        id: 10,
        ausPostRate: 2.592,
        ausPostRateFrom: new Date(),
        description: 'EPARCEL CONSINMENTS',
        driverRate: 1.2,
        packageCategory: 1,
        status: "active",
        type: "E",
        area_id: 1,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        ausPostRate: 2.0746,
        ausPostRateFrom: new Date(),
        description: 'EPARCEL CONSINMENTS',
        driverRate: 1.2,
        packageCategory: 1,
        status: "active",
        type: "E",
        area_id: 2,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        ausPostRate: 2.2,
        ausPostRateFrom: new Date(),
        description: 'EPARCEL CONSINMENTS',
        driverRate: 1.2,
        packageCategory: 1,
        status: "active",
        type: "E",
        area_id: 3,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },


      {
        id: 13,
        ausPostRate: 0.6428,
        ausPostRateFrom: new Date(),
        description: 'EPARCEL ADDITIONALS',
        driverRate: 1.2,
        packageCategory: 1,
        status: "active",
        type: "F",
        area_id: 1,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        ausPostRate: 0.6712,
        ausPostRateFrom: new Date(),
        description: 'EPARCEL ADDITIONALS',
        driverRate: 1.2,
        packageCategory: 1,
        status: "active",
        type: "F",
        area_id: 2,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        ausPostRate: 1.1,
        ausPostRateFrom: new Date(),
        description: 'EPARCEL ADDITIONALS',
        driverRate: 0.66,
        packageCategory: 1,
        status: "active",
        type: "F",
        area_id: 3,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: 16,
        ausPostRate: 8.4619,
        ausPostRateFrom: new Date(),
        description: 'DROP RATE',
        driverRate: 1.2,
        packageCategory: 2,
        status: "active",
        type: "G",
        area_id: 1,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        ausPostRate: 6.6,
        ausPostRateFrom: new Date(),
        description: 'DROP RATE',
        driverRate: 0.0,
        packageCategory: 2,
        status: "active",
        type: "G",
        area_id: 2,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        ausPostRate: 6.1018,
        ausPostRateFrom: new Date(),
        description: 'DROP RATE',
        driverRate: 4.0,
        packageCategory: 2,
        status: "active",
        type: "G",
        area_id: 3,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: 19,
        ausPostRate: 3.245,
        ausPostRateFrom: new Date(),
        description: 'SCHOOL COLLECTION',
        driverRate: 2.5,
        packageCategory: 2,
        status: "active",
        type: "H",
        area_id: 1,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        ausPostRate: 2.431,
        ausPostRateFrom: new Date(),
        description: 'SCHOOL COLLECTION',
        driverRate: 2.0,
        packageCategory: 2,
        status: "active",
        type: "H",
        area_id: 2,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 21,
        ausPostRate: 2.981,
        ausPostRateFrom: new Date(),
        description: 'SCHOOL COLLECTIONS',
        driverRate: 2.0,
        packageCategory: 3,
        status: "active",
        type: "H",
        area_id: 3,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 22,
        ausPostRate: 1.4386,
        ausPostRateFrom: new Date(),
        description: 'THROW OFF FROM DF',
        driverRate: 1.2,
        packageCategory: 2,
        status: "active",
        type: "I",
        area_id: 2,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 23,
        ausPostRate: 1.4386,
        ausPostRateFrom: new Date(),
        description: 'THROW OF DF',
        driverRate: 1.2,
        packageCategory: 3,
        status: "active",
        type: "I",
        area_id: 3,
        driverRateFrom: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }

     ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('packages', null, {});
  }
};
