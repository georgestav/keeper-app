import jwt from "jsonwebtoken";

export default function verifyAccess(permitedRole) {
	return async (req, res, next) => {
		if (!req.headers.authorization) {
			return res.status(403).send({ message: "Login required" });
		}
		try {
			const token = req.headers.authorization.split(" ");
			const decoded = jwt.verify(token[1], process.env.TOKEN_KEY); //decodec.token contains user_id, role and username of the logged in user
			const parsed = JSON.parse(decoded.token);
			if (parsed.role !== permitedRole) {
				return res.status(403).send({ message: "Action not allowed" });
			}
			next();
		} catch (error) {
			console.error(error);
			return res.status(500).send({ message: error.name });
		}
	};
}
