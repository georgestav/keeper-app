import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";

// Sequelize automaticaly changes Note to Notes for the database, it can be defined here and thats what i am doing
const Note = db.define(
	"notes",
	{
		//model attributes defined here
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
			type: DataTypes.STRING(3500),
		},
	},
	{
		freezeTableName: true, // telling sequilize i want the table name defined above
	}
);

export default Note;
