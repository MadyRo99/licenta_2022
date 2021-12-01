'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        firstName: 'Madalin',
        lastName: 'Danescu',
        email: 'madalindanescu99@gmail.com',
        password: 'q',
        gender: 'Masculin',
        year: 'Anul 4 Licenta',
        status: 1,
        roleId: 1,
        facultyId: 2
      },
      {
        firstName: 'Mihai',
        lastName: 'Popescu',
        email: 'mihaipopescu00@gmail.com',
        password: 'q',
        gender: 'Masculin',
        year: 'Anul 3 Licenta',
        status: 1,
        roleId: 1,
        facultyId: 1
      },
      {
        firstName: 'Alexandra',
        lastName: 'Radulescu',
        email: 'alexandraradulescu@gmail.com',
        password: 'q',
        gender: 'Feminin',
        year: 'Anul 2 Licenta',
        status: 0,
        roleId: 3,
        facultyId: 2
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
