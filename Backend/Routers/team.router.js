const Router = require("express").Router;
const {
   createTeam_POST,
   getTeams_GET,
   getUsers_POST,
   getPolls_POST,
   addUser_POST,
   joinTeam_POST,
} = require("../Controllers/team.controller.js");

const router = Router();

router.post("/create", createTeam_POST);

router.get("/get", getTeams_GET);

router.post("/getusers", getUsers_POST);

router.post("/getpolls", getPolls_POST);

router.post("/adduser", addUser_POST);

router.post("/join", joinTeam_POST);

module.exports = router;
