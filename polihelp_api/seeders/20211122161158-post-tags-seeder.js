'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('post_tags', [
      {
        tag: 'materii',
        postId: 1
      },
      {
        tag: 'restante',
        postId: 1
      },
      {
        tag: 'evenimente',
        postId: 2
      },
      {
        tag: 'taxe',
        postId: 3
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
