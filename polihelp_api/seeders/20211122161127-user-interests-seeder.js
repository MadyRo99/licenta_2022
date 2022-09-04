'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_interests', [
      {
        interest: 'Tennis',
        userId: 1
      },
      {
        interest: 'Netflix',
        userId: 1
      },
      {
        interest: 'Tennis',
        userId: 2
      },
      {
        interest: 'Fotbal',
        userId: 2
      },
      {
        interest: 'Fotografie',
        userId: 3
      },
      {
        interest: 'Alergat',
        userId: 3
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
