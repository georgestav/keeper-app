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
		},
		avatar: {
			type: DataTypes.BLOB("long"),
		},
	},
	{
		freezeTableName: true, // telling sequilize i want the table name defined above
	}
);

//hash users password on create
User.beforeCreate((user) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		user.password = bcrypt.hashSync(user.password, salt);
	} catch (err) {
		console.log(err);
	}
});

//hash users password on update
User.beforeUpdate((user) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		user.password = bcrypt.hashSync(user.password, salt);
	} catch (err) {
		console.log(err);
	}
});

export default User;
