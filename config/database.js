/**
 * Alternately, this folder may be called 'db' or 'connection'.
 * This file may be called 'connection'.
 * However, it seems standard programming practice is to call this file 'database'.  Since I put runValidators here, calling this file 'database' instead of 'connection' is more descriptive and accurate.
 * Though this file is not itself a database, contextually it is understood to contain information specific to the database.
 */
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

mongoose.set('runValidators', true);

const connectMongooseToMongoDB = async () => {
  await mongoose.connect(uri)
    .then(() => console.log('Successfully connected to MongoDB! ', mongoose.connection.name))
    .catch(err => console.error('Connection error', err));
}

mongoose.connect(uri)
  .then(() => console.log('Successfully connected to MongoDB! ', mongoose.connection.name))
  .catch(err => console.error('Connection error', err));

module.exports = connectMongooseToMongoDB;