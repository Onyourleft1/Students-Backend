const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database/database");
const User = require("./User");

const UserFile = sequelize.define(
	"UserFile",
	{
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: "id",
			},
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		path: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		deletedAt: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		paranoid: true,
	}
);
module.exports = UserFile;
