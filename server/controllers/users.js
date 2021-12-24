import User from "../models/userModel.js";

export const createUser = async (req, res) => {
	console.log(req.body);
	// try {
	// 	await User.create(req.body);
	// 	console.log(req.body);
	// 	res.json({ message: "User Created" });
	// } catch (err) {
	// 	console.log(err.message);
	// 	res.json({ message: err.message });
	// }
	res.send();
};
