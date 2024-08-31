const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database/database");

const Front = sequelize.define(
	"Front",
	{
		bg_color: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		font_size: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
		header_bg_color: {
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
module.exports = Front;
