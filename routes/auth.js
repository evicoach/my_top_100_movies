const Router = require("express").Router;
const router = Router();
const auth_validator = require("../app/auth/auth_validator");
const auth_controller = require("../app/auth/auth_controller");
router.post("/signup", auth_validator.signup, auth_controller.signup);
router.post("/login", auth_validator.login, auth_controller.login);
router.get("/otp", auth_controller.sendOtp);
router.post("/otp", auth_controller.verify);
router.post(
  "/password",
  auth_validator.validateOtp,
  auth_controller.setPassword
);
router.post("/pin", auth_validator.validateOtp, auth_controller.setPin);
module.exports = router;
