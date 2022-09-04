'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('friendships', [
      {
        firstUserId: 1,
        secondUserId: 2,
        requestDate: new Date().toISOString(),
        approveDate: new Date().toISOString(),
      },
      {
        firstUserId: 2,
        secondUserId: 3,
        requestDate: new Date().toISOString(),
        approveDate: new Date().toISOString()
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
