'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      authorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          onDelete: 'cascade'
        }
      },
      content: {
        type: Sequelize.TEXT,
        length: 5000
      },
      createdAt: {
        type: Sequelize.DATE,
        default: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        default: Sequelize.NOW
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts');
  }
};
