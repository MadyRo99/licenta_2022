'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('event_participants', [
      {
        userId: 1,
        eventId: 2
      },
      {
        userId: 2,
        eventId: 1
      },
      {
        userId: 2,
        eventId: 3
      },
      {
        userId: 3,
        eventId: 1
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
