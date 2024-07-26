const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../connect/db");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fullname: {
    type: DataTypes.STRING,
  },
  dob: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.INTEGER,
  },
});

module.exports = User;
