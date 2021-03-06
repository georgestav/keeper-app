import { Sequelize, DataTypes, Model } from "sequelize";
import db from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Sequelize automaticaly changes User to Users for the database, it can be defined here and thats what i am doing

const User = db.define(
	"users",
	{
		//model attributes defined here

		user_id: {
			primaryKey: true,
			type: Sequelize.UUID,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
		},
		role: {
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
			unique: true,
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

// custom methods

//Login authentication
User.loginAuth = async (res) => {
	try {
		const userFound = await User.findOne({ where: { email: res.email } });
		if (!bcrypt.compareSync(res.password, userFound.dataValues.password)) {
			throw new Error();
		}
		const user = userFound.dataValues;
		return {
			user_id: user.user_id,
			role: user.role,
			username: user.username,
		};
	} catch (error) {
		throw Error("Could not authenticate");
	}
};

//generate token
User.createToken = async (res) => {
	// prettier-ignore
	const token = jwt.sign({token: res.toString()},process.env.TOKEN_KEY,{ expiresIn: "48h"});
	return token;
};

export default User;
