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
} from "../controllers/Users.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.json({ msg: "Server up!", status: "In development" });
});
//notes routes
router.post("/note", createNote);
router.get("/note", readAllNotes);
router.get("/note=:id", readNotesById);
router.patch("/note=:id", updateNoteById);
router.delete("/note=:id", deleteNotebyId);
router.delete("/note/deleteAll", deleteAllNotes);

//user routes
router.post("/user", createUser);
router.get("/user=:id", getUserByID); //only logged in and authenticated
router.patch("/user=:id", updateUserByID); //only logged in and authenticated
router.delete("/user=:id", deleteUserById); //only logged in and authenticated

export default router;
