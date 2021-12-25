import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";
import bcrypt from "bcryptjs";

// Sequelize automaticaly changes User to Users for the database, it can be defined here and thats what i am doing

const User = db.define(
	"users",
	{
		//model attributes defined here

		user_id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		access: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		f_name: {
			type: DataTypes.STRING(250),
			allowNull: false,
		},
		l_name: {
			type: DataTypes.STRING(250),
		},
		email: {
			type: DataTypes.STRING(250),
			isEmail: true,
			allowNull: false,
			unique: true,
		},
		username: {
			type: DataTypes.STRING(250),
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING(250),
			allowNull: false,
			validate: {
				len: {
					args: 6,
					msg: "Password must be more than 6 characters",
				},
			},
			set(value) {
				try {
					const salt = bcrypt.genSaltSync(10);
					const password = bcrypt.hashSync(value, salt);
					return this.setDataValue("password", password);
				} catch (err) {
					console.log(err);
				}
			},
		},
		avatar: {
			type: DataTypes.BLOB("long"),
		},
	},
	{
		freezeTableName: true, // telling sequilize i want the table name defined above
	}
);

export default User;
