'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('post_likes', [
      {
        userId: 1,
        postId: 1
      },
      {
        userId: 1,
        postId: 2
      },
      {
        userId: 1,
        postId: 3
      },
      {
        userId: 2,
        postId: 1
      },
      {
        userId: 2,
        postId: 1
      },
      {
        userId: 3,
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
