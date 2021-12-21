import { Sequelize } from "sequelize";

const env = process.env;

const db = new Sequelize(env.db_name, env.db_user, env.db_pass, {
	host: env.db_address,
	dialect: env.db_dialect,
});

export default db;
