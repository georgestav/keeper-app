//core dependencies
import express from "express";
import db from "./config/database.js";
import Routes from "./routes/index.js";
import cors from "cors";
import User from "./models/userModel.js";
import Role from "./models/rolesModel.js";

const app = express();
// syncronise db

Role.belongsToMany(User, {
	through: "user_roles",
	foreignKey: "role_id",
	otherKey: "user_id",
});

User.belongsToMany(Role, {
	through: "user_roles",
	foreignKey: "user_id",
	otherKey: "role_id",
});
await db.sync({ alter: true });
console.log("All models were synchronized successfully.");
// DB connection
try {
	await db.authenticate();
	console.log("DB Connected...");
} catch (error) {
	console.error("DB connection error: ", error);
}

// Enable CORS Requests
const corsOptions = {
	origin: "http://localhost:3001",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));

//good practice to turn this off, avoids detection of apps running Express and then launch specifically-targeted attacks.
app.disable("x-powered-by");

// parse incoming requests with JSON payloads
app.use(express.json());
// parse incoming requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", Routes);

//server listen
app.listen(process.env.PORT, () => {
	console.log("Server up on port: " + process.env.PORT);
});
