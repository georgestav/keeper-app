import express from "express";

import {
	createNote,
	readAllNotes,
	readNotesById,
	updateNoteById,
	deleteNotebyId,
	deleteAllNotes,
} from "../controllers/Notes.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.json({ msg: "Server up!", status: "In development" });
});

router.post("/note", createNote);
router.get("/note", readAllNotes);
router.get("/note=:id", readNotesById);
router.patch("/note=:id", updateNoteById);
router.delete("/note=:id", deleteNotebyId);
router.delete("/note/deleteAll", deleteAllNotes);

export default router;
