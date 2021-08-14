const Router = require("express").Router;
const {
   createPoll_POST,
   getPoll_POST,
   submitPoll_POST,
   endPoll_POST,
} = require("../Controllers/poll.controller.js");

const router = Router();

router.post("/create", createPoll_POST);
router.post("/get", getPoll_POST);
router.post("/submit", submitPoll_POST);
router.post("/end", endPoll_POST);

module.exports = router;
