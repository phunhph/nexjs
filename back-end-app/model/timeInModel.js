const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../connect/db");

const action = sequelize.define("action", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING,
  },
  time_in: {
    type: DataTypes.DATE,
  },
});

module.exports = action;
