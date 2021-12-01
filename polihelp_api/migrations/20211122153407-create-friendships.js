'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('friendships', {
      firstUserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          onDelete: 'cascade'
        }
      },
      secondUserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          onDelete: 'cascade'
        }
      },
      requestDate: {
        type: Sequelize.DATE,
        default: Sequelize.NOW
      },
      approveDate: {
        type: Sequelize.DATE,
        default: null
      },
      deniedDate: {
        type: Sequelize.DATE,
        default: null
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('friendships');
  }
};
