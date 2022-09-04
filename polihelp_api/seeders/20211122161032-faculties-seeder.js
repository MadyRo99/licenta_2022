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
      },
      {
        name: 'Facultatea de Inginerie Electrica'
      },
      {
        name: 'Facultatea de Energetica'
      },
      {
        name: 'Facultatea de Inginerie Mecanica si Mecatronica'
      },
      {
        name: 'Facultatea de Inginerie Industriala si Robotica'
      },
      {
        name: 'Facultatea de Ingineria Sistemelor Biotehnice'
      },
      {
        name: 'Facultatea de Inginerie Aerospatiala'
      },
      {
        name: 'Facultatea de Stiinta si Ingineria Materialelor'
      },
      {
        name: 'Facultatea de Inginerie Chimica si Biotehnologii'
      },
      {
        name: 'Facultatea de Inginerie in Limbi Straine'
      },
      {
        name: 'Facultatea de Stiinte Aplicate'
      },
      {
        name: 'Facultatea de Inginerie Medicala'
      },
      {
        name: 'Facultatea de Antreprenoriat, Ingineria si Managementul Afacerilor'
      },
      {
        name: 'Facultatea de Formare pentru Cariera Didactica si Stiinte Socio-Umane'
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
