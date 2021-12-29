import formidable from "formidable";
import sharp from "sharp";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

async function idFromToken(req) {
	try {
		const token = req.headers.authorization.split(" ");
		const decoded = jwt.verify(token[1], process.env.TOKEN_KEY); //decodec.token contains user_id, role and username of the logged in user
		const parsed = JSON.parse(decoded.token);
		return parsed.user_id;
	} catch (error) {
		throw Error(error);
	}
}

export const getLoggedUser = async (req, res) => {
	try {
		const uID = await idFromToken(req);
		const user = await User.findOne({
			where: { user_id: uID },
			attributes: {
				exclude: ["password"],
			},
		});
		res.json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const updateLoggedUser = async (req, res) => {
	try {
		const uID = await idFromToken(req);
		const user = await User.update(req.body, {
			where: { user_id: uID },
		});
		res.json({
			message:
				"User updated, logout and log back in for the changes to take effect",
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const deleteLoggedUser = async (req, res) => {
	try {
		const uID = await idFromToken(req);
		await User.destroy({
			where: { user_id: uID },
		});
		res.json({ message: "Your account is now deleted" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const createUser = async (req, res) => {
	if (req.body.password !== req.body.confPassword) {
		return res.status(400).send({
			message:
				"password provided does not match the confirmation password",
		});
	}
	try {
		await User.create(req.body);
		res.status(201).json({
			message: "User Created",
			// auth: true,
			// token: "token",
		});
	} catch (err) {
		res.status(400).send({ message: err.errors[0].message });
	}
};

export const loginUser = async (req, res) => {
	try {
		const user = await User.loginAuth(req.body);
		const token = await User.createToken(JSON.stringify(user));
		res.send({ token, message: "Login successful" });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

export const logoutUser = async (req, res) => {
	try {
		res.send({ token: null, message: "logged out" });
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};
