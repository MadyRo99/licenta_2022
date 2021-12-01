'use strict';

module.exports = {
  up: async (queryInterface) => {
     await queryInterface.bulkInsert('roles', [
         {
           name: 'Student'
         },
         {
           name: 'Masterand'
         },
         {
           name: 'Profesor'
         }
     ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
