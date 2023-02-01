const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Comment = require('../models/Comment.model');
const Concert = require('../models/Concert.model');

//  POST /api/comments  -  Creates a new comment
router.post('/comments', isAuthenticated, (req, res, next) => {
  console.log(req.payload._id)
  
  const userId = req.payload._id
  const { user, comment, concert } = req.body;

  Comment.create({ user, comment, concert })
    .then(newComment => {
      return Concert.findByIdAndUpdate(concert, { $push: { comments: newComment._id } } );
    })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

// GET /api/comment -  Retrieves all of the comment
router.get('/comments', (req, res, next) => {
  Concert.find()
    .populate('comments')
    .then(allConcerts => res.json(allConcerts))
    .catch(err => res.json(err));
});


router.get('/:id/comment', (req, res, next) => {

  const {id} = req.params

Concert.findById(id)

  .then(foundConcert => res.render('concerts/comment', foundConcert))
  .catch(err => console.log(err))

});

router.post('/:concertId/comment', isAuthenticated, (req, res, next) => {
  console.log(req.payload._id)

  const userId = req.payload._id
  const {comment} = req.body
  console.log(comment)
  
  const {concertId} = req.params
  console.log("USER ID", userId)

  if (!comment) {
      res.render('/:id/comment', { errorMessage: 'Please write a comment before sending the form.' });
      return;
    }

    Comment.create({user: userId, comment, concert: concertId})
      .then((newComment) => {
        console.log(concertId)
          Concert.findById(concertId)
          
              .then((commentedConcert) => {
                  commentedConcert.comments.push(newComment._id) 
                  commentedConcert.save()
              })
              .catch(err => console.log(err))
      })
      .then(() => res.redirect('/concerts'))
      .catch(err => console.log(err))

});

module.exports = router;