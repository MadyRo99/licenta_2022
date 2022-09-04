'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('posts', [
      {
        authorId: 1,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        createdAt: new Date().toISOString()
      },
      {
        authorId: 2,
        content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
        createdAt: new Date().toISOString()
      },
      {
        authorId: 3,
        content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
        createdAt: new Date().toISOString()
      },
      {
        authorId: 1,
        content: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer eget nibh rutrum lacus ullamcorper viverra quis ullamcorper nulla. Ut aliquam odio eget erat porttitor porttitor.",
        createdAt: new Date().toISOString()
      },
      {
        authorId: 2,
        content: "Donec velit velit, elementum in lectus at, hendrerit tempus quam. Proin fringilla cursus sem, non vestibulum turpis cursus at. Donec dapibus tortor et elit placerat, quis fermentum nibh condimentum. Sed sagittis erat sem, efficitur pharetra felis elementum non.",
        createdAt: new Date().toISOString()
      },
      {
        authorId: 3,
        content: "Ut urna turpis, ornare nec accumsan vitae, bibendum eget eros. Pellentesque fringilla pretium augue non convallis. Mauris nec velit malesuada, tincidunt risus eget, efficitur nisl. Morbi porttitor dapibus mauris vitae consectetur. Nullam dapibus ipsum ut mauris accumsan tempus. Donec id finibus dui.",
        createdAt: new Date().toISOString()
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
