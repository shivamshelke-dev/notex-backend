const Note = require("../models/Note");

/*
====================================
CREATE NOTE
====================================
*/
exports.createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const newNote = await Note.create({
      title,
      content,
      tags: tags || [],
      user: req.user._id,
    });

    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


/*
====================================
GET ALL ACTIVE NOTES
====================================
*/
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user._id,
      isDeleted: false,
    }).sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


/*
====================================
GET SINGLE NOTE
====================================
*/
exports.getSingleNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


/*
====================================
UPDATE NOTE
====================================
*/
exports.updateNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, content, tags },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


/*
====================================
SOFT DELETE (MOVE TO TRASH)
====================================
*/
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.isDeleted = true;
    note.deletedAt = new Date();

    await note.save();

    res.status(200).json({ message: "Note moved to trash" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


/*
====================================
GET TRASH NOTES
====================================
*/
exports.getDeletedNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user._id,
      isDeleted: true,
    }).sort({ deletedAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


/*
====================================
RESTORE NOTE FROM TRASH
====================================
*/
exports.restoreNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.isDeleted = false;
    note.deletedAt = null;

    await note.save();

    res.status(200).json({ message: "Note restored successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


/*
====================================
PERMANENT DELETE
====================================
*/
exports.permanentDelete = async (req, res) => {
  try {
    await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: true,
    });

    res.status(200).json({ message: "Note permanently deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
