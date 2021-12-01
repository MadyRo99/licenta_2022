'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('faculties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        length: 100
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('faculties');
  }
};
