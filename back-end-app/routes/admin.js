const userController = require("../controllers/userController");
var express = require("express");
const AuthMiddleware = require("../mididleware/AuthMiddleware");
var router = express.Router();

var router = express.Router();
/* GET home page. */
// router.use(AuthMiddleware.isAuth);
// crud user
router.get("/users", userController.getAllUsers);
router.get("/user/infor/:id", userController.getUserById);
router.put("/user/update/:id", userController.updateUser);
router.delete("/user/delete/:id", userController.deleteUser);
// rollback user
router.get("/users/destroyed", userController.historyUser);
router.delete("/user/rollBack/:id", userController.rollBackUser);
//time in
router.get("/users/userByTimeIn", userController.getUserbyTimeIn);
router.post("/users/createTimeIn", userController.createTimeIn);

module.exports = router;
