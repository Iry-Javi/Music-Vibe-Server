const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");
const {isAuthenticated} = require("../middleware/jwt.middleware")
const jwt = require("jsonwebtoken");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/upload", fileUploader.single("image"), (req, res) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ image: req.file.path });
})

router.put("/users", isAuthenticated, (req, res) => {
  const {_id, username, image } = req.body;
  User.findByIdAndUpdate(_id, {username, image}, {new:true})
    .populate("concert")
    .then((updatedUser) => {
      const {_id, username, image, concert} = updatedUser;
      const payload = {_id, username, image, concert };
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });
      res.json( { updatedUser: payload, authToken })})
.catch(err => console.error(err))
})

module.exports = router;
