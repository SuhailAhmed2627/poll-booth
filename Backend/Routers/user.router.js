const Router = require("express").Router;
const { signupUser_POST, loginUser_POST, getUser_POST } = require("../Controllers/user.controller.js");

const router = Router();

router.post("/signup", signupUser_POST);
router.post("/login", loginUser_POST);
router.post("/get", getUser_POST);

module.exports = router;
