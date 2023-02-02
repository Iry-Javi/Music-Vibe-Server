const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Concert =  require('../models/Concert.model');
const User = require('../models/User.model');
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const jwt = require("jsonwebtoken");


router.post('/concerts', isAuthenticated, (req, res) => {
  const { title, image, description,  country, city, street, houseNumber, postalCode, comment } = req.body;
  const userId = req.payload._id

  Concert.create({ title, image, description, country, city, street, houseNumber, postalCode, comment: [] })
  .then(newConcert => {
      return User.findByIdAndUpdate(userId, {
        $push: { concert: newConcert._id },
      },{new: true})
      .populate("concert")
    })
      .then((updatedUser) => {
        const {_id, username, image, concert} = updatedUser;
        const payload = {_id, username, image, concert };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        res.json( { updatedUser: payload, authToken })})
      .catch(err => res.json(err));
});

// GET /api/concerts -  Retrieves all of the concerts
router.get('/concerts', isAuthenticated, (req, res, next) => {
  Concert.find()
    .populate('comments')
    .then(allConcerts => res.json(allConcerts))
    .catch(err => res.json(err));
});

//  GET /api/concerts/:concertId -  Retrieves a specific project by id
router.get('/concerts/:concertId', (req, res, next) => {
  const { concertId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(concertId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  // Each Project document has a `tasks` array holding `_id`s of Task documents
  // We use .populate() method to get swap the `_id`s for the actual Task documents
  Concert.findById(concertId)
    .populate('comments')
    .populate({ 
      path: 'comments',
      populate: {
          path: "user", // populate property 'user' within property 'reviews'
          model: "User",
      } 
  })
    .then(concert => res.status(200).json(concert))
    .catch(error => res.json(error));
});

// PUT  /api/concerts/:concertId  -  Updates a specific project by id
router.put('/concerts/:concertId', isAuthenticated, (req, res, next) => {
  const { concertId } = req.params;
  const userId = req.payload._id;
  if (!mongoose.Types.ObjectId.isValid(concertId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Concert.findByIdAndUpdate(concertId, req.body, { new: true })
    .then(updatedConcert => {     // update the user state on the front end
      return User.findById(userId).populate("concert")
      })
      .then((updatedUser) => {
        const {_id, username, image, concert} = updatedUser;
        const payload = {_id, username, image, concert };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        res.json( { updatedUser: payload, authToken })
      })
    .catch(error => res.json(error));
});

// DELETE  /api/projects/:projectId  -  Deletes a specific project by id
router.delete('/concerts/:concertId', isAuthenticated, (req, res, next) => {
  const { concertId } = req.params;
  const userId = req.payload._id;
  if (!mongoose.Types.ObjectId.isValid(concertId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Concert.findByIdAndRemove(concertId)
  .then(deletedConcert => {
    return User.findByIdAndUpdate(userId, {
      $pull: { concert: deletedConcert._id },
    },{new: true})
    .populate("concert")
  })
  .then((updatedUser) => {
    const {_id, username, image, concert} = updatedUser;
    const payload = {_id, username, image, concert };
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });
    res.json( { updatedUser: payload, authToken })
  })  
    .catch(error => res.json(error));
});

module.exports = router;