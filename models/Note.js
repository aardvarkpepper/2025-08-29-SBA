const { Schema, model } = require('mongoose');
// const User = require('./User');

const noteSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please enter a note title.'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Please enter note content.']
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    //https://mongoosejs.com/docs/schematypes.html#objectids
    // for user's ObjectId - explicitly, ._id, the unique ID assigned by MongoDB.
    ref: 'User',
    required: true,
  }
});

const Note = model('Note', noteSchema);

module.exports = Note;