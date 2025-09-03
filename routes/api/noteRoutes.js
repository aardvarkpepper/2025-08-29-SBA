//=====
//api/noteRoutes.js

const router = require('express').Router();
const Note = require('../../models/Note');
const { authMiddleware } = require('../../utils/auth');

// note:  no Controllers on this.  Eh, it's OK. 

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

// GET /api/notes - Get all notes for the logged-in user
router.get('/', async (req, res) => {
  try {
    if (!req.user._id) {
      throw new Error("No user._id detected.  The user may not be logged in.")
    }
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!req.user._id) {
      throw new Error("No user._id detected.  The user may not be logged in.")
    }
    const note = await Note.findOne({ _id: req.params.id }); // why didn't I use findById?  Practice, why not.
    // could just pop another field in the findOne argument, but eh.
    if (!note) {
      return res.status(404).json({ message: 'No note found with this id!' });
    }
    if (note.user !== req.user._id) {
      return res.status(403).json({ messsage: '403 Forbidden; user is not authorized to view this note.' });
    }
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * Modify the “Create Note” Route: In your notes route file (routes/api/notes.js), find the POST / route. When a new note is created, you must associate it with the currently logged-in user. The authenticated user’s data should be available on req.user from the authentication middleware. Save the user’s _id to the new note’s user field.
 */

// POST /api/notes - Create a new note
router.post('/', async (req, res) => {
  try {
    if (!req.user._id) {
      throw new Error("No user._id detected.  The user may not be logged in.")
    }
    const note = await Note.create({
      ...req.body,
      user: req.user._id,
      // The user ID needs to be added here - done.
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT /api/notes/:id - Update a note
router.put('/:id', async (req, res) => {
  try {
    if (!req.user._id) {
      throw new Error("No user._id detected.  The user may not be logged in.")
    }
    // This needs an authorization check
    const note = await Note.findById(req.params.id);
    // console.log('Put: note found: note.user:', note.user);
    if (!note) {
      return res.status(404).json({ message: 'No note found with this id!' });
    }
    if (String(note.user) !== req.user._id) {
      console.log('put', String(note.user), req.user._id, String(note.user) === req.user._id);
      return res.status(403).json({ messsage: '403 Forbidden; user is not authorized to alter this note.' });
    }
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE /api/notes/:id - Delete a note
router.delete('/:id', async (req, res) => {
  try {
    if (!req.user._id) {
      throw new Error("No user._id detected.  The user may not be logged in.")
    }
    // This needs an authorization check
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'No note found with this id!' });
    }
    if (String(note.user) !== req.user._id) {
      return res.status(403).json({ messsage: '403 Forbidden; user is not authorized to delete this note.' });
    }
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted!', note: deletedNote });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;