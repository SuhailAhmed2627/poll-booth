const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema({
   username: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   notifications: {
      type: [String],
      default: [],
   },
   teamsID: {
      type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "team" }],
      default: [],
   },
   pollsID: {
      type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "poll" }],
      default: [],
   },
});

userSchema.pre("save", function (next) {
   if (!this.isModified("password")) {
      return next();
   }
   bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) {
         return next(err);
      }
      this.password = hash;
      next();
   });
});

userSchema.methods.checkPassword = function (password) {
   const passwordHash = this.password;
   return new Promise((resolve, reject) => {
      bcrypt.compare(password, passwordHash, (err, same) => {
         if (err) {
            return reject(err);
         }
         resolve(same);
      });
   });
};

module.exports = mongoose.model("user", userSchema);
