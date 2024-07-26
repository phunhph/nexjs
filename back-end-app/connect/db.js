// Tạo kết nối đến MySQL
// const mysql = require("mysql2");
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "",
//   password: "",
//   database: "",
// });
// module.exports = db;
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("app-quan-ly", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
module.exports = sequelize;
