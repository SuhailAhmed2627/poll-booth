const Poll = require("../Models/poll.model.js");
const Team = require("../Models/team.model.js");
const User = require("../Models/user.model.js");

Date.prototype.addDays = function (hours) {
   this.setDate(this.getDate() + parseInt(hours));
   return this;
};

Date.prototype.addHours = function (hours) {
   this.setHours(this.getHours() + parseInt(hours));
   return this;
};

Date.prototype.addMinutes = function (minutes) {
   this.setMinutes(this.getMinutes() + parseInt(minutes));
   return this;
};

exports.createPoll_POST = async (req, res) => {
   let newPoll = await Poll.create(req.body.poll);

   let dateNow = new Date();
   if (req.body.expireIn.includes("days")) {
      dateNow.addDays(req.body.expireIn);
   }
   if (req.body.expireIn.includes("hours")) {
      dateNow.addHours(req.body.expireIn);
   }

   if (req.body.expireIn.includes("minutes")) {
      dateNow.addMinutes(req.body.expireIn);
   }

   await Poll.findOneAndUpdate({ _id: newPoll._id }, { expiresAt: dateNow });

   let { pollsID } = await Team.findOne({ _id: newPoll.teamID }).select(
      "pollsID"
   );
   pollsID.push(newPoll._id);
   await Team.updateOne({ _id: newPoll.teamID }, { pollsID: pollsID });

   res.status(200).send(JSON.stringify(newPoll._id));
};

exports.getPoll_POST = async (req, res) => {
   let response = await Poll.find({ teamID: req.body.teamID }).exec();
   res.status(200).send(JSON.stringify(response));
};

exports.submitPoll_POST = async (req, res) => {
   var { options, pollQuestion } = await Poll.findOne({
      _id: req.body.pollID,
   }).select("options pollQuestion");
   options.forEach((option) => {
      if (option.value === req.body.selectedOption) {
         option.count++;
      }
   });
   await Poll.findOneAndUpdate(
      { _id: req.body.pollID },
      { $push: { usersID: req.body.user._id } }
   );
   await Poll.findOneAndUpdate(
      { _id: req.body.pollID },
      { $set: { options: options } }
   );
   await User.findOneAndUpdate(
      { _id: req.body.user._id },
      { $push: { pollsID: req.body.pollID } }
   );

   const { teamname, createdBy } = await Team.findOne({
      pollsID: { $all: [req.body.pollID] },
   }).select("teamname createdBy");

   const notification = `${req.body.user.username} voted on Poll "${pollQuestion}" for team "${teamname}"`;

   await User.findOneAndUpdate(
      { _id: createdBy },
      { $push: { notifications: notification } }
   );

   res.status(200).send({ message: "Success" });
};

exports.endPoll_POST = async (req, res) => {
   await Poll.findOneAndUpdate(
      { _id: req.body.pollID },
      { expiresAt: new Date() }
   );
   res.status(200).send({ message: "Success" });
};
