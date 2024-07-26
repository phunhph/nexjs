const jwt = require("jsonwebtoken");
const createClient = require("redis");
class AuthMiddleware {
  isAuth = async (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
      const bearer = bearerHeader.split(" ");
      const token = bearer[1];
      var decoded = jwt.decode(token);
      if (decoded.exp >= Date.now()) {
        let response = await fetch("https://api.ipify.org?format=json");
        let ip = await response.json();
        const client = await createClient
          .createClient()
          .on("error", (err) => console.log("Redis Client Error", err))
          .connect();
        let user = await client.get(token);
        if (user) {
          let obj = JSON.parse(user);
          if (obj.ipv4 === ip.ip) {
            next();
          } else {
            if (req.body.code) {
              if (req.body.code == obj.code) {
                let response = await fetch("https://api.ipify.org?format=json");
                let ip = await response.json();
                const data_redis = {
                  code: req.body.code,
                  ipv4: ip.ip,
                };
                await client.set(token, JSON.stringify(data_redis));
                return res
                  .status(200)
                  .json({ messager: "confirm successfully" });
              } else {
                await client.del(token);
                return res.status(401).json({ error: "login" });
              }
            } else {
              return res.status(404).json({ error: "req undefined" });
            }
          }
        } else {
          return res.status(404).json({ error: "redis undefined" });
        }
      } else {
        return res.status(401).json({ error: "login" });
      }
    } else {
      return res.status(401).json({ error: "login" });
    }
  };
}
module.exports = new AuthMiddleware();
