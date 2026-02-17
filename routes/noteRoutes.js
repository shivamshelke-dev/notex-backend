const express = require("express");
const router = express.Router();
const {
  createNote,
  getNotes,
  getSingleNote,
  updateNote,
  deleteNote,
  getDeletedNotes,
  restoreNote,
  permanentDelete,
} = require("../controllers/noteController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createNote);
router.get("/", protect, getNotes);

router.get("/trash", protect, getDeletedNotes);

router.get("/:id", protect, getSingleNote);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

router.put("/restore/:id", protect, restoreNote);
router.delete("/permanent/:id", protect, permanentDelete);

module.exports = router;
