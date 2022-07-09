'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      authorId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        length: 100
      },
      location: {
        type: Sequelize.STRING,
        length: 100
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      image: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT,
        length: 7500
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
    await queryInterface.dropTable('events');
  }
};
