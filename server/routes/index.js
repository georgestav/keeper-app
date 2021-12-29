import express from "express";
import sharp from "sharp";
import verifyAccess from "../middleware/verifyAccess.js";

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
router.post("/api/note", verifyAccess("user"), createNote);
router.get("/api/note", verifyAccess("user"), readAllNotes);
router.get("/api/note=:id", verifyAccess("user"), readNotesById);
router.patch("/api/note=:id", verifyAccess("user"), updateNoteById);
router.delete("/api/note=:id", verifyAccess("user"), deleteNotebyId);
router.delete("/api/note/deleteAll", verifyAccess("user"), deleteAllNotes);

//user routes
router.post("/api/register", createUser);
router.get("/api/user=:id", verifyAccess("user"), getUserByID); //only logged and authenticated
router.patch("/api/user=:id", verifyAccess("user"), updateUserByID); //only logged and authenticated
router.delete("/api/user=:id", verifyAccess("user"), deleteUserById); //only logged and authenticated
// login
router.post("/api/login", loginUser);
// logout

export default router;
