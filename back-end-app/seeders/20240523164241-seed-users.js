"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let time = new Date();
    await queryInterface.bulkInsert("Users", [
      {
        fullname: "Nguyễn Hữu Phú",
        dob: "2024-05-24",
        status: 1,
      },
      {
        fullname: "Nguyễn Hữu Phú 2",
        dob: "2024-05-24",
        status: 1,
      },
      {
        fullname: "Nguyễn Hữu Phú 3",
        dob: "2024-05-24",
        status: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
