// bin/seeds.js

const mongoose = require('mongoose');
const Concert = require('../models/Concert.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/library-project';

const concerts = [
  // PASTE HERE THE LIST OF concerts PROVIDED IN THIS GIST: https://gist.github.com/ironhack-edu/2816267a015d4870f95275cb873d33b6
];

mongoose
  .connect(MONGO_URI)
  .then(x => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);

    // Create new documents in the concerts collection
    return Concert.create(concerts);
  })
  .then(concertsFromDB => {
    console.log(`Created ${concertsFromDB.length} concerts`);

    // Once the documents are created, close the DB connection
    return mongoose.connection.close();
  })
  .then(() => {
    // Once the DB connection is closed, print a message
    console.log('DB connection closed!');
  })
  .catch(err => {
    console.log(`An error occurred while creating concerts from the DB: ${err}`);
  });
