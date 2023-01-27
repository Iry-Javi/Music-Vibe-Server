const mongoose = require('mongoose');
const { Schema, model, SchemaTypes } = mongoose;
// TODO: Please make sure you edit the Concert model to whatever makes sense in this case
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
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

module.exports = model('Concert', concertSchema);
