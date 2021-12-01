'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('friendships', [
      {
        firstUserId: 1,
        secondUserId: 2,
      },
      {
        firstUserId: 1,
        secondUserId: 3,
      },
      {
        firstUserId: 2,
        secondUserId: 3,
      },
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
