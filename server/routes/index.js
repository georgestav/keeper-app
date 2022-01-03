import express from "express";
import verifyAccess from "../middleware/verifyAccess.js";
import multer from "multer";
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
	setAvatar,
	viewMyAvatar,
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

//upload avatar
const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
});
router.post(
	"/api/me/avatar",
	verifyAccess("user"),
	upload.single("avatar"),
	setAvatar
); //

//display avatar
router.get("/api/me/avatar", verifyAccess("user"), viewMyAvatar);

//register user
router.post("/api/register", createUser); //public
// login
router.post("/api/login", loginUser); //public
// logout
router.post("/api/logout", verifyAccess("user"), logoutUser); //only logged and authenticated

export default router;
