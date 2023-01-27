const mongoose = require('mongoose');
const { Schema, model, SchemaTypes } = mongoose;

const concertSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },

    imageUrl: {
      type: String

    },
    address: { 
      country: {
        type: String, 
      required: true
      },
      postalcode: {
        type: String, 
      required: true
      },
      street: {
        type: String, 
      required: true
      },
      housenumber: {
        type: String, 
      required: true
      },
      city: {
        type: String, 
      required: true
      },
      
    },
    
    description: {
      type: String,
    },

    comments: 
    [{ 
      type: SchemaTypes.ObjectId, 
      ref: "Comment" 
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = model('Concert', concertSchema);