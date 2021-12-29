import jwt from "jsonwebtoken";

export default async function verifyToken(req, res, next) {
	if (!req.headers.authorization) {
		return res.status(403).send({ message: "Login required" });
	}
	try {
		const token = req.headers.authorization.split(" ");
		const decoded = jwt.verify(token[1], process.env.TOKEN_KEY);
		console.log(decoded);
		next();
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: error });
	}
}
