const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database/database");
const Product = require("./Product");

const ProductGallery = sequelize.define(
	"ProductGallery",
	{
		product_id: {
			type: DataTypes.INTEGER,
			references: {
				model: Product,
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
module.exports = ProductGallery;
