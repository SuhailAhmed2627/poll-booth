const express = require("express");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const { json, urlencoded } = require("body-parser");
const path = require("path");
const cors = require("cors");
const Poll = require("./Models/poll.model.js");

const { protect } = require("./Middleware/auth.js");

mongoose.connect("mongodb://localhost:27017/delta-poll-booth", {
   useNewUrlParser: true,
});

var gfs;

connection = mongoose.connection;

connection.once("open", () => {
   gfs = Grid(connection.db, mongoose.mongo);
   gfs.collection("uploads");
});

const storage = new GridFsStorage({
   url: "mongodb://localhost:27017/delta-poll-booth",
   file: (req, file) => {
      return new Promise((resolve, reject) => {
         crypto.randomBytes(16, (err, buf) => {
            if (err) {
               return reject(err);
            }
            const filename =
               buf.toString("hex") + path.extname(file.originalname);
            const fileInfo = {
               filename: filename,
               bucketName: "uploads",
            };
            resolve(fileInfo);
         });
      });
   },
});
const upload = multer({ storage });

const userRouter = require("./Routers/user.router.js");
const pollRouter = require("./Routers/poll.router.js");
const teamRouter = require("./Routers/team.router.js");

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/team", protect, teamRouter);
app.use("/api/poll", protect, pollRouter);

app.post("/upload/:pollid", upload.array("files", 3), async (req, res) => {
   const id = req.params.pollid;
   const files = req.files;
   const filenames = files.map((file) => {
      return { value: file.filename };
   });
   await Poll.updateOne({ _id: id }, { options: filenames });
   res.json({ files: req.files });
});

app.get("/file/:filename", (req, res) => {
   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (!file || file.length === 0) {
         return res.status(404).json({
            err: "No file exists",
         });
      }
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
   });
});

app.use(express.static(path.join(__dirname, "Public")));

const port = 3000;

app.listen(port, () => console.log(`http://localhost:${port}`));
