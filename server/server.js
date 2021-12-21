//core dependencies
import express from "express";
import db from "./config/database.js";
import noteRoutes from "./routes/index.js";
import cors from "cors";

const app = express();

// DB connection
try {
	await db.authenticate();
	console.log("DB Connected...");
} catch (error) {
	console.error("DB connection error: ", error);
}

// Enable All CORS Requests
app.use(cors());
// parse incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", noteRoutes);

//server listen
app.listen(process.env.PORT, () => {
	console.log("Server up on port: " + process.env.PORT);
});
