'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        length: 50
      },
      lastName: {
        type: Sequelize.STRING,
        length: 50
      },
      email: {
        type: Sequelize.STRING,
        length: 100,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.INTEGER
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: 'id',
          onDelete: 'cascade'
        }
      },
      facultyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'faculties',
          key: 'id',
          onDelete: 'cascade'
        }
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
    await queryInterface.dropTable('users');
  }
};