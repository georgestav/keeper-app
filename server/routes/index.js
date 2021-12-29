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
	getLoggedUser,
	updateLoggedUser,
	deleteLoggedUser,
	loginUser,
	logoutUser,
} from "../controllers/Users.js";

const router = express.Router();

router.get("/api", (req, res) => {
	res.json({ msg: "Server up!", status: "In development" });
});
//notes routes
router.post("/api/note", verifyAccess("user"), createNote); //only logged and authenticated
router.get("/api/note", verifyAccess("user"), readAllNotes); //only logged and authenticated
router.get("/api/note=:id", verifyAccess("user"), readNotesById); //only logged and authenticated
router.patch("/api/note=:id", verifyAccess("user"), updateNoteById); //only logged and authenticated
router.delete("/api/note=:id", verifyAccess("user"), deleteNotebyId); //only logged and authenticated
router.delete("/api/note/deleteAll", verifyAccess("user"), deleteAllNotes); //only logged and authenticated

//user routes
router.get("/api/me", verifyAccess("user"), getLoggedUser); //only logged and authenticated
router.patch("/api/me", verifyAccess("user"), updateLoggedUser); //only logged and authenticated
router.delete("/api/me", verifyAccess("user"), deleteLoggedUser); //only logged and authenticated

//register user
router.post("/api/register", createUser); //public
// login
router.post("/api/login", loginUser);
// logout
router.post("/api/logout", verifyAccess("user"), logoutUser);

export default router;
