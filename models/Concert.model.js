const mongoose = require('mongoose');
const { Schema, model, SchemaTypes } = mongoose;

const concertSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },

    image: {
      type: String
    },

    description: {
      type: String,
    },

    country: {
      type: String, 
      required: true
      },

    city: {
      type: String, 
      required: true
      },

    street: {
      type: String, 
      required: true
      },
  
    houseNumber: {
      type: String, 
      required: true
      },

    postalCode: {
      type: String, 
      required: true
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