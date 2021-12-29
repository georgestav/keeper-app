import { Sequelize, DataTypes, Model } from "sequelize";
import db from "../config/database.js";

const Role = db.define("role", {
	role_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING,
	},
});

export default Role;
