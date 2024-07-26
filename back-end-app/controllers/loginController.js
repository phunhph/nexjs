const express = require("express");
const jwt = require("jsonwebtoken");
const Account = require("../model/accountModel");
const createClient = require("redis");

class LoginController {
  Login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Account.findOne({
        where: {
          email: email,
          password: password,
        },
      });

      if (user) {
        let role = user.role;
        // create token
        const token = jwt.sign(
          { user, iat: Date.now(), exp: Date.now() + 36000000 },
          "your-secret-key"
        );

        // export code
        var randomNumber = "";
        for (var i = 0; i < 5; i++) {
          randomNumber += Math.floor(Math.random() * 9) + 1;
        }

        let response = await fetch("https://api.ipify.org?format=json");
        let ip = await response.json();

        const data_redis = {
          code: randomNumber,
          ipv4: ip.ip,
        };
        // create in redis
        const client = await createClient
          .createClient()
          .on("error", (err) => console.log("Redis Client Error", err))
          .connect();
        await client.set(token, JSON.stringify(data_redis));
        // export view
        const data = {
          token: token,
          role: role,
          code: randomNumber,
        };
        res.status(200).json({ success: true, data });
      } else {
        return res.status(404).json({ error: "undefined user" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  CheckToken = async (req, res) => {
    try {
      const bearerHeader = req.headers.authorization;
      if (bearerHeader) {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        var decoded = jwt.decode(token);
        if (decoded.exp >= Date.now()) {
          let role = decoded.user.role;
          let id_user = decoded.user.id_user;
          const user = {
            id_user: id_user,
            role: role,
          };
          return res.status(200).json({ message: "Login successfully", user });
        } else {
          return res.status(401).json({ error: "login" });
        }
      } else {
        return res.status(401).json({ error: "login" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };
}
module.exports = new LoginController();
