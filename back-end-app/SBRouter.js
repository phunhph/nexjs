var express = require("express");
var clientRouter = require("./routes/client");
var adminRouter = require("./routes/admin");

var app = express();
app.use("/", clientRouter);
app.use("/admin", adminRouter);
/* GET users listing. */
app.get("/check", (req, res) => {
  const routes = [];

  function findRoutes(stack) {
    stack.forEach((middleware) => {
      if (middleware.route) {
        routes.push({
          path: `http://localhost:3000${middleware.route.path}`,
          method: Object.keys(middleware.route.methods)[0].toUpperCase(),
        });
      } else if (middleware.handle.stack) {
        findRoutes(
          middleware.handle.stack,
          basePath + middleware.regexp.source
        );
      }
    });
  }

  findRoutes(app._router.stack);
  res.json(routes);
});
// app.use("/login", loginRouter);
module.exports = app;
