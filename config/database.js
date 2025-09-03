/**
 * Alternately, this folder may be called 'db' or 'connection'.
 * This file may be called 'connection'.
 * However, it seems standard programming practice is to call this file 'database'.  Since I put runValidators here, calling this file 'database' instead of 'connection' is more descriptive and accurate.
 * Though this file is not itself a database, contextually it is understood to contain information specific to the database.
 */
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI; // already using require dotenv from server.js.

mongoose.set('runValidators', true);

// possibly mongoose.set should be performed in server.js?  Who knows how the order of loading works?
// const userSchema = new mongoose.Schema( . . . , {runValidators: true}); if want schema-specific.  But I don't want that.

const connectMongooseToMongoDB = async () => {
  await mongoose.connect(uri)
    .then(() => console.log('Successfully connected to MongoDB! ', mongoose.connection.name))
    .catch(err => {
      console.error('Failed to connect to MongoDB:', err.message);
      process.exit(1); // to shut down server
    });
  // mongoose.connection.on("error", error => {
  //   console.error("MongoDB connection error:", error.message); // mid-process.  Similar to 
  // });

}

module.exports = connectMongooseToMongoDB;

// review video to see how connection is passed.