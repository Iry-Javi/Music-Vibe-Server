const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Comment = require('../models/Comment.model');
const Concert = require('../models/Concert.model');

//  POST /api/comments  -  Creates a new comment
router.post('/comments', (req, res, next) => {
  const { user, comment } = req.body;

  Comment.create({ user, comment, concert: concertid })
    .then(newComment => {
      return Concert.findByIdAndUpdate(concertid, { $push: { comments: newComment._id } } );
    })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

// GET /api/comment -  Retrieves all of the concerts
router.get('/comments', (req, res, next) => {
  Concert.find()
    .populate('comments')
    .then(allConcerts => res.json(allConcerts))
    .catch(err => res.json(err));
});
module.exports = router;
