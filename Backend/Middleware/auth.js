const jwt = require("jsonwebtoken");
const User = require("../Models/user.model.js");

exports.newToken = (user) => {
   return jwt.sign({ id: user.id }, "somesecret", {
      expiresIn: 5000,
   });
};

exports.verifyToken = (token) => {
   new Promise((resolve, reject) => {
      jwt.verify(token, "somesecret", (err, payload) => {
         if (err) {
            return reject(err);
         }
         resolve(payload);
      });
   });
};

exports.protect = async (req, res, next) => {
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

   if (!user) {
      return res.status(406).end();
   }
   req.body.user = user;
   next();
};
