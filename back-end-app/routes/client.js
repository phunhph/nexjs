const userController = require("../controllers/userController");
const LoginController = require("../controllers/loginController");
var express = require("express");
const AuthMiddleware = require("../mididleware/AuthMiddleware");
var router = express.Router();

//login
router.post("/login", LoginController.Login);
router.get("/login/token", LoginController.CheckToken);
router.get("/deleteToken", LoginController.CheckToken);
// client
// router.use(AuthMiddleware.isAuth);
router.post("/confirm", () => {});
router.get("/user/infor/:id", userController.getUserById);
router.post("/timeIn", userController.TimeIn);

module.exports = router;
