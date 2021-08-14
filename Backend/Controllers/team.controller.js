const Team = require("../Models/team.model.js");
const User = require("../Models/user.model.js");
const Poll = require("../Models/poll.model.js");
const mongoose = require("mongoose");

exports.createTeam_POST = async (req, res) => {
   let team;
   try {
      team = await Team.create({
         teamname: req.body.teamname,
         createdBy: req.body.user._id,
      });
   } catch (error) {
      res.status(400).send(
         JSON.stringify({ message: "Teamname Taken, Try a Different teamname" })
      );
   }
   if (team) {
      await Team.findOneAndUpdate(
         { _id: team._id },
         { $push: { usersID: { userID: req.body.user._id, role: "admin" } } }
      );
      await User.findOneAndUpdate(
         { _id: req.body.user._id },
         { $push: { teamsID: team._id } }
      );
      res.status(200).send(JSON.stringify({ message: "Team Created" }));
   }
};

exports.addUser_POST = async (req, res) => {
   let userID;

   userID = await User.findOne({ username: req.body.username }).select("_id");
   if (userID == null) {
      res.status(400).send(JSON.stringify({ message: "Username not Found" }));
   } else {
      await Team.findOneAndUpdate(
         { _id: req.body.teamID },
         { $push: { usersID: { userID: userID, role: "student" } } }
      );

      await User.findOneAndUpdate(
         { _id: userID },
         { $push: { teamsID: req.body.teamID } }
      );
      res.status(200).send(JSON.stringify({ message: "User Added" }));
   }
};

exports.getTeams_GET = async (req, res) => {
   var query = req.body.user.teamsID;
   query = query.map((x) => {
      return mongoose.Types.ObjectId(x);
   });
   let teams = await Team.find({
      _id: { $in: query },
   });
   res.status(200).send(JSON.stringify(teams));
};

const getUserDetails = async (user) => {
   const { username } = await User.findOne({ _id: user.userID }).select(
      "username"
   );
   const userDetails = {
      username: username,
      role: user.role,
   };
   return userDetails;
};

exports.getUsers_POST = async (req, res) => {
   const usernames = await User.find({
      _id: { $in: req.body.usersID.map((user) => user.userID) },
   }).select("username");
   var usersDetails = [];
   for (let i = 0; i < req.body.usersID.length; i++) {
      usersDetails.push({
         username: usernames[i].username,
         role: req.body.usersID[i].role,
         _id: req.body.usersID[i].userID,
      });
   }
   res.status(200).send(JSON.stringify(usersDetails));
};

exports.getPolls_POST = async (req, res) => {
   const polls = await Poll.find({ _id: { $in: req.body.pollsID } }).select(
      "-usersID"
   );
   res.status(200).send(JSON.stringify(polls));
};

exports.joinTeam_POST = async (req, res) => {
   let temp = true;
   try {
      await Team.findOneAndUpdate(
         { _id: req.body.teamID },
         { $push: { usersID: { userID: req.body.user._id, role: "student" } } }
      );
   } catch (error) {
      temp = false;
      res.status(400).send(JSON.stringify({ message: "Invalid Team ID" }));
   }
   if (temp) {
      await User.findOneAndUpdate(
         { _id: req.body.user._id },
         { $push: { teamsID: req.body.teamID } }
      );
      res.status(200).send(JSON.stringify({ message: "Joined team" }));
   }
};
