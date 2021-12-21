import Note from "../models/noteModel.js";

export const readAllNotes = async (req, res) => {
	try {
		const allNotes = await Note.findAll();
		res.json(allNotes);
	} catch (error) {
		res.json({ message: error.message });
	}
};

export const readNotesById = async (req, res) => {
	try {
		const note = await Note.findAll({
			where: { id: req.params.id },
		});
		res.json(note[0]);
	} catch (error) {
		res.json({ message: error.message });
	}
};

export const createNote = async (req, res) => {
	try {
		await Note.create(req.body);
		res.json({ message: "Note Added" });
	} catch (err) {
		res.json({ message: error.message });
	}
};

export const updateNoteById = async (req, res) => {
	try {
		await Note.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		res.json({ message: "Note updated" });
	} catch (error) {
		res.json({ message: error.message });
	}
};

export const deleteNotebyId = async (req, res) => {
	try {
		const destroy = await Note.destroy({
			where: { id: req.params.id },
		});
		if (!destroy) {
			return res.status(404).json({ message: `Note not found` });
		}
		res.json({ message: `Note id: ${req.params.id} Deleted` });
	} catch (error) {
		res.json({ message: error.message });
	}
};

export const deleteAllNotes = async (req, res) => {
	try {
		const destroy = await Note.destroy({ where: {} });
		if (!destroy) {
			return res
				.status(404)
				.json({ message: `No notes in the directory` });
		}
		res.json({ message: `All notes Deleted` });
	} catch (error) {
		res.json({ message: error.message });
	}
};
