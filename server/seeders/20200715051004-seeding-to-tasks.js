'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Tasks', [{
       title: 'Mengerjakan Hal 1',
       category: "Backlog",
       createdAt: new Date(),
       updatedAt: new Date(),
       UserId: 1,
       UserEmail: "poo@gmail.com"
     },{
         title: 'Mengerjakan Hal 3',
         category: "Development",
         createdAt: new Date(),
         updatedAt: new Date(),
         UserId: 1,
         UserEmail: "poo@gmail.com"
       },{
          title: 'Mengerjakan Hal 4',
          category: "Done",
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: 1,
          UserEmail: "poo@gmail.com"
        },{
           title: 'Mengerjakan Hal 5',
           category: "Backlog",
           createdAt: new Date(),
           updatedAt: new Date(),
           UserId: 1,
           UserEmail: "poo@gmail.com"
         }], {});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Tasks', null, {})
  }
};
