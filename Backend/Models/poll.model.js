const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
   expiresAt: {
      type: Date,
   },
   pollQuestion: {
      type: String,
      required: true,
      unique: true,
   },
   options: {
      type: [
         {
            value: {
               type: String,
               default: "",
            },
            count: {
               type: Number,
               default: 0,
            },
         },
      ],
      required: true,
   },
   optionsType: {
      type: String,
      enum: ["text", "image", "audio", "video"],
      required: true,
   },
   teamID: { type: mongoose.SchemaTypes.ObjectId, ref: "team" },
   usersID: { type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }], default: [] },
});

module.exports = mongoose.model("poll", pollSchema);
