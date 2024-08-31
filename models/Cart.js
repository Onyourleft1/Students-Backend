const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database/database");
const Product = require("./Product");
const User = require("./User");

const Cart = sequelize.define(
	"Cart",
	{
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: "id",
			},
			allowNull: false,
		},
		product_id: {
			type: DataTypes.INTEGER,
			references: {
				model: Product,
				key: "id",
			},
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
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
module.exports = Cart;
