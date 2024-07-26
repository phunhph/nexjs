"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Action extends Model {
    static associate(models) {
      Action.belongsTo(models.User, { foreignKey: "id_user", targetKey: "id" });
    }
  }
  Action.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: DataTypes.INTEGER,
      status: DataTypes.STRING,
      time_in: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Action",
    }
  );
  return Action;
};
