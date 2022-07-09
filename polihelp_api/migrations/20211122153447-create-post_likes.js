'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('post_likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          onDelete: 'cascade'
        }
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'posts',
          key: 'id',
          onDelete: 'cascade'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('post_likes');
  }
};
