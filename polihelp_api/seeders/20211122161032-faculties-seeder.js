'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('faculties', [
      {
        name: 'Facultatea de Automatică si Calculatoare'
      },
      {
        name: 'Facultatea de Electronica, Telecomunicatii si Tehnologia Informatiei'
      },
      {
        name: 'Facultatea Transporturi'
      }
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
