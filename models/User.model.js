const { Schema, model, SchemaTypes } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
    },

    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },

    image: {
      type: String
    },
    concert: {
      type: [SchemaTypes.ObjectId],
      ref: 'Concert',
      default:[]
    }
    
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
