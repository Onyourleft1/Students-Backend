const { Sequelize } = require("sequelize");

const dbConfig = require("../config/config");

const sequelize = new Sequelize(
	dbConfig.database,
	dbConfig.user,
	dbConfig.password,
	{
		host: dbConfig.server,
		dialect: "mysql",
	}
);

sequelize
	.authenticate()
	.then(() => {
		console.log("Connection established successfully");
	})
	.catch((err) => {
		console.error("Unable to connect to the database:", err);
	});

module.exports = sequelize;
