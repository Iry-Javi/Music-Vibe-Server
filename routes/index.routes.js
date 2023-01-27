const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");

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

router.get("/users", (req, res) => {

})

router.put("/users", (req, res) => {
  const {_id, username, image } = req.body;

  User.findByIdAndUpdate(_id, {username, image}, {new:true})
  .then(updatedUser => {
    const {_id, username, image } = updatedUser
    res.json({ updatedUser: {_id, username, image} })
})
.catch(err => console.error(err))

})

module.exports = router;
