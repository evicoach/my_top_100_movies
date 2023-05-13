const Router = require("express").Router;
const router = Router();
const userController = require("../app/user/user_controller");
router.get("/", userController.findByTag);
router.post("/waiting", userController.joinWaitingList);
module.exports = router;