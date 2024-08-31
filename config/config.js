const dotenv = require("dotenv");

dotenv.config();

const dbConfig = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	server: process.env.DB_SERVER,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	encrypt: false,
	trustServerCertificate: true,
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000,
	},
};

module.exports = dbConfig;
