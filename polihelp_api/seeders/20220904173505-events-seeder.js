'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('events', [
      {
        authorId: 1,
        name: "Festivitatea de Absolvire a UPB",
        location: "UPB Rectorat, Bucuresti",
        startDate: new Date("2023-07-15"),
        endDate: new Date("2023-07-18"),
        image: "https://imagini-profil.s3.eu-central-1.amazonaws.com/ie4t6oJbUAQabehErG0eXLyzSsoixJPk.png",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aspernatur assumenda dolor ipsum iste laborum magnam optio vel. Esse facilis incidunt ipsa iure labore, neque nesciunt non sed voluptates voluptatibus?",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        authorId: 2,
        name: "Tir cu Arcul",
        location: "Parcul de Aventura Comana, Comana",
        startDate: new Date("2022-10-08"),
        endDate: new Date("2022-10-09"),
        image: "https://imagini-eveniment.s3.eu-central-1.amazonaws.com/HX2npo0YDyUOBpw7YZV4u8jUpJbfcSpJ.png",
        content: "Duis maximus vel turpis ac iaculis. In hac habitasse platea dictumst. Sed vulputate placerat ex eu vulputate. Suspendisse id felis sed mi tristique egestas non et lorem. Quisque a posuere eros. Vestibulum congue mattis metus ut imperdiet. Sed semper lorem eu egestas vestibulum.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        authorId: 3,
        name: "Half Marathon",
        location: "Padurea Baneasa, Bucuresti",
        startDate: new Date("2023-05-15"),
        endDate: new Date("2023-05-16"),
        image: "https://imagini-eveniment.s3.eu-central-1.amazonaws.com/BPA3KOlM87sBYu24mEmuoRh1TbbOsofD.png",
        content: "Fusce ut finibus sem. Nullam faucibus imperdiet eleifend. Morbi quam elit, volutpat ut lectus eget, interdum pellentesque sem. Phasellus accumsan varius mauris finibus maximus. Mauris diam metus, fringilla nec felis eu, tincidunt ornare diam. Mauris rutrum tristique massa quis elementum. Duis vehicula semper justo, ac suscipit ex ullamcorper id.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
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
