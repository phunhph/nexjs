"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("Roles", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        role: {
          type: Sequelize.STRING,
        },
        status: {
          type: Sequelize.INTEGER,
        },
        createdAt: {
          type: Sequelize.DATEONLY,
          allowNull: false,
          defaultValue: new Date(),
        },
        updatedAt: {
          type: Sequelize.DATEONLY,
          allowNull: false,
          defaultValue: new Date(),
        },
      })
      .then();
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Roles");
  },
};
