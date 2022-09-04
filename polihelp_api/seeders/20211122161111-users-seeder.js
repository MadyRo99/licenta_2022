'use strict';

let bcrypt = require("bcryptjs")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        firstName: 'Ion-Madalin',
        lastName: 'Danescu',
        email: 'madalindanescu99@gmail.com',
        password: bcrypt.hashSync("parolamea", 10),
        year: 'Anul 4 Licenta',
        profileImage: 'https://imagini-profil.s3.eu-central-1.amazonaws.com/pJ6wbqW4DYLE902gr0ZOVFvEIlZIlXAF.png',
        status: 1,
        roleId: 1,
        facultyId: 2
      },
      {
        firstName: 'Mihai',
        lastName: 'Popescu',
        email: 'mihaipopescu98@gmail.com',
        password: bcrypt.hashSync("parolamea", 10),
        year: 'Anul 1 Master',
        profileImage: 'https://imagini-profil.s3.eu-central-1.amazonaws.com/PsohcXEyBi4CYGZd6EgsTY4eyLj8YVkX.png',
        status: 1,
        roleId: 2,
        facultyId: 1
      },
      {
        firstName: 'Alexandra',
        lastName: 'Popescu',
        email: 'alexandrapopescu@gmail.com',
        password: bcrypt.hashSync("parolamea", 10),
        year: null,
        profileImage: 'https://imagini-profil.s3.eu-central-1.amazonaws.com/MFvdTRXPsN4vkAX4iwMiLBsRiA7qOKzp.png',
        status: 1,
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
