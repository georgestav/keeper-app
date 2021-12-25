import express from "express";
import sharp from "sharp";
import {
	createNote,
	readAllNotes,
	readNotesById,
	updateNoteById,
	deleteNotebyId,
	deleteAllNotes,
} from "../controllers/Notes.js";

import {
	createUser,
	getUserByID,
	updateUserByID,
	deleteUserById,
	loginUser,
} from "../controllers/Users.js";

const router = express.Router();

router.get("/api", (req, res) => {
	res.json({ msg: "Server up!", status: "In development" });
});
//notes routes
router.post("/api/note", createNote);
router.get("/api/note", readAllNotes);
router.get("/api/note=:id", readNotesById);
router.patch("/api/note=:id", updateNoteById);
router.delete("/api/note=:id", deleteNotebyId);
router.delete("/api/note/deleteAll", deleteAllNotes);

//user routes
router.post("/api/register", createUser);
router.get("/api/user=:id", getUserByID); //only logged and authenticated
router.patch("/api/user=:id", updateUserByID); //only logged and authenticated
router.delete("/api/user=:id", deleteUserById); //only logged and authenticated
// login
router.post("/api/login", loginUser);
// logout

export default router;
