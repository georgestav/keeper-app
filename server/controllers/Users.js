import formidable from "formidable";
import sharp from "sharp";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

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
		const verified = jwt.verify(token, process.env.TOKEN_KEY);
		console.log(verified);
		res.cookie("u_id", token, {
			expires: new Date(Date.now() + 60000 * 60 * 24 * 2),
			httpOnly: true,
		}).json(user);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};
