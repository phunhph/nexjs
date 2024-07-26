const User = require("../model/userModel");
const action = require("../model/timeInModel");
const createClient = require("redis");
const jwt = require("jsonwebtoken");

class UserController {
  getAllUsers = async (req, res, next) => {
    try {
      const users = await User.findAll({ where: { status: 1 } });
      return res.status(200).json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };
  getUserById = async (req, res, next) => {
    try {
      let id = parseInt(req.params.id);
      const user = await User.findByPk(id);
      if (user) {
        return res.status(200).json(user);
      }
      return res.status(404).json({ error: "User not found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };
  createUser = async (req, res, next) => {
    try {
      const user = await User.create(req.body);
      return res.status(201).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };
  updateUser = async (req, res, next) => {
    try {
      const user = await User.update(req.body, {
        where: { id: req.params.id },
      });
      return res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };
  deleteUser = async (req, res, next) => {
    try {
      let user = await User.findByPk(req.params.id);
      user.status = 0;
      await user.save();
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };
  historyUser = async (req, res, next) => {
    try {
      const users = await User.findAll({ where: { status: 0 } });
      return res.status(200).json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };
  rollBackUser = async (req, res, next) => {
    try {
      let user = await User.findByPk(req.params.id);
      user.status = 1;
      await user.save();
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };
  TimeIn = async (req, res) => {
    try {
      const bearerHeader = req.headers.authorization;
      const bearer = bearerHeader.split(" ");
      const token = bearer[1];
      var decoded = jwt.decode(token);
      const data = {
        timeIn: req.body.date,
        ipv4: req.body.ipv4,
        id_user: decoded.user.id_user,
      };
      let time = new Date(req.body.date);
      let day =
        time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate();
      const client = await createClient
        .createClient()
        .on("error", (err) => console.log("Redis Client Error", err))
        .connect();
      await client.set(
        day + "_id:" + decoded.user.id_user,
        JSON.stringify(data)
      );
      await client.disconnect();
      return res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };
  getDataInRedis = async (element) => {
    // console.log(element);
    let timeScsecfully = new Date();
    let time = new Date();
    let day = time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate();
    const client = await createClient
      .createClient()
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect();
    let user = await client.get(day + "_id:" + element.id);
    if (user) {
      let timeSave = {};
      timeSave.id_user = element.id;
      timeSave.fullname = element.fullname;
      timeSave.dob = element.dob;
      user = JSON.parse(user);
      timeScsecfully.setHours(9, 0, 0);
      let checktime = new Date(user.timeIn);
      if (checktime.getTime() < timeScsecfully.getTime()) {
        timeSave.time_in = checktime;
        timeSave.status = "Đi sớm";
      } else if (checktime == time) {
        timeSave.time_in = checktime;
        timeSave.status = "ĐI đúng giờ";
      } else {
        timeSave.time_in = checktime;
        timeSave.status = "Đi Muộn";
      }
      return timeSave;
    }
  };
  getUserbyTimeIn = async (req, res, next) => {
    try {
      let timeUsers = [];
      const users = (await User.findAll()).map((x) => x.dataValues);
      if (users) {
        timeUsers = await Promise.all(
          users.map(async (user) => this.getDataInRedis(user))
        );
      }
      return res.status(200).json(timeUsers.filter((x) => !!x));
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };
  createTimeIn = (req, res) => {
    req.body.forEach(async (element) => {
      await action.create(element);
      let time = new Date();
      let day =
        time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate();
      const client = await createClient
        .createClient()
        .on("error", (err) => console.log("Redis Client Error", err))
        .connect();
      await client.del(day + "_id:" + element.id_user);
    });
    return res.status(201).json({ message: "Created successfully" });
  };
}

module.exports = new UserController();
