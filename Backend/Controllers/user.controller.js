const User = require("../Models/user.model.js");
const jwt = require("jsonwebtoken");
const { newToken } = require("../Middleware/auth.js");

exports.signupUser_POST = async (req, res) => {
   if (!req.body.username || !req.body.password) {
      return res.status(400).send({ message: "Need Username and password" });
   }
   try {
      const user = await User.create(req.body);
      return res.status(201).send(user);
   } catch (e) {
      return res.status(500).end();
   }
};

exports.loginUser_POST = async (req, res) => {
   if (!req.body.username || !req.body.password) {
      return res.status(400).send({ message: "Need Username and password" });
   }

   const invalid = { message: "Invalid Username and password" };

   try {
      const user = await User.findOne({ username: req.body.username }).select("username password").exec();

      if (!user) {
         return res.status(401).send(invalid);
      }

      const match = await user.checkPassword(req.body.password);

      if (!match) {
         return res.status(401).send(invalid);
      }

      const token = newToken(user);
      return res.status(201).send({ token });
   } catch (e) {
      console.error(e);
      res.status(500).end();
   }
};

exports.getUser_POST = async (req, res) => {
   const bearer = req.headers.authorization;
   if (!bearer || !bearer.startsWith("Bearer ")) {
      return res.status(401).end();
   }

   const token = bearer.split("Bearer ")[1].trim();
   let payload;

   try {
      payload = jwt.verify(token, "somesecret");
   } catch (e) {
      return res.status(401).end();
   }

   const user = await User.findById(payload.id).select("-password").lean().exec();
   res.status(201).send(JSON.stringify(user));
};
