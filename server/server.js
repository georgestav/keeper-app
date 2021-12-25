//core dependencies
import express from "express";
import db from "./config/database.js";
import Routes from "./routes/index.js";
import cors from "cors";

const app = express();

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
