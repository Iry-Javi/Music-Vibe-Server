const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User.model');


//  GET /api/users/:usertId -  Retrieves a specific project by id
router.get('/users/:usertId', (req, res, next) => {
  const { usertId } = req.params;
 
  if (!mongoose.Types.ObjectId.isValid(usertId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  // Each User document has a `tasks` array holding `_id`s of Task documents
  // We use .populate() method to get swap the `_id`s for the actual Task documents
 User.findById(userId)
    .populate('comments')
    .then(user => res.status(200).json(user))
    .catch(error => res.json(error));
});

// PUT  /api/users/:userId  -  Updates a specific project by id
router.put('/users/:userId', (req, res, next) => {
  const { userId } = req.params;
 
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch(error => res.json(error));
});

// DELETE  /api/users/:userId  -  Deletes a specific user by id
router.delete('/users/:userId', (req, res, next) => {
  const { userId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  User.findByIdAndRemove(userId)
    .then(() => res.json({ message: `User with ${userId} is removed successfully.` }))
    .catch(error => res.json(error));
});