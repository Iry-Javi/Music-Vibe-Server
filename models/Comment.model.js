const { Schema, model, SchemaTypes } = require('mongoose');

const commentSchema = new Schema({
    user: { type: SchemaTypes.ObjectId, ref: "User" },
    comment: { type: String, maxlength: 200 },
    concert: {type: SchemaTypes.ObjectId, ref: "Concert" }
  });

  module.exports = model('Comment', commentSchema);