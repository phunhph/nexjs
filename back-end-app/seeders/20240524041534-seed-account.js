"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Accounts",
      [
        {
          id_user: 1,
          email: "phu@gmail.com",
          password: "123",
          role: 1,
        },
        {
          id_user: 2,
          email: "phu@gmail.com",
          password: "123",
          role: 1,
        },
        {
          id_user: 3,
          email: "phu@gmail.com",
          password: "123",
          role: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
