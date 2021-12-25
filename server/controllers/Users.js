import formidable from "formidable";
import sharp from "sharp";
import User from "../models/userModel.js";

export const createUser = async (req, res) => {
	try {
		await User.create(req.body);
		res.status(201).json({
			message: "User Created",
			// auth: true,
			// token: "token",
		});
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

export const getUserByID = async (req, res) => {
	try {
		const user = await User.findOne({
			where: { user_id: req.params.id },
			attributes: {
				exclude: ["password"],
			},
		});
		res.json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const updateUserByID = async (req, res) => {
	try {
		const user = await User.update(req.body, {
			where: { user_id: req.params.id },
		});
		res.json({ message: "User updated" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const deleteUserById = async (req, res) => {
	try {
		await User.destroy({
			where: { user_id: req.params.id },
		});
		res.json({ message: "Your account is now deleted" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const loginUser = async (req, res) => {
	try {
		const user = await User.loginAuth(req.body);
		const token = await User.createToken(user.user_id);
		res.cookie("user_id", token, {
			expires: new Date(Date.now() + 60000 * 60 * 24 * 2),
			httpOnly: true,
		}).json(user);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// const form = formidable({ maxFileSize: 1000000 });

// 	form.parse(req, (err, fields, files) => {
// 		if (err) {
// 			res.status(err.httpCode).send(err.message);
// 			return next(err);
// 		}
// 		const imgToBuffer = sharp(files)
// 			.resize(300, 300)
// 			.toBuffer()
// 			.then((data) => data)
// 			.catch((err) => console.error(err));

// 		console.log({ fields, files });
// 		res.status(201).send("ok");
// 	});
