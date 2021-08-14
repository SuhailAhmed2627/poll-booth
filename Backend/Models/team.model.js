const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
   teamname: {
      type: String,
      required: true,
      unique: true,
   },
   createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
   },
   chat: {
      type: [
         {
            text: {
               type: String,
               max: 2000,
            },
            sender: {
               type: mongoose.SchemaTypes.ObjectId,
               ref: "user",
            },
         },
      ],
      default: [],
   },
   link: {
      type: String,
      default: "",
   },
   pollsID: { type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "poll" }], default: [] },
   usersID: {
      type: [
         {
            userID: {
               type: mongoose.SchemaTypes.ObjectId,
               ref: "user",
            },
            role: {
               type: String,
               enum: ["student", "CR", "teacher", "admin"],
            },
         },
      ],
      default: [],
   },
});

teamSchema.pre("save", async function (next) {
   this.usersID = [this.get("createdBy")];
   this.link = `localhost:3000/api/team/join/${this.get("_id")}`;
   next();
});

module.exports = mongoose.model("team", teamSchema);
