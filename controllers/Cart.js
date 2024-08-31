const Cart = require("../models/Cart");
// const jwt = require("jsonwebtoken");
// const { validator } = require("../Utils/Common");
const dotenv = require("dotenv");
dotenv.config();
// const secretKey = process.env.JWT_SECRET;

module.exports = {
	get: async (req, res) => {
		// const { id } = req.params;
		const id = req.query.id;
		if (!id) {
			const allCarts = await Cart.findAll({
				attributes: {
					exclude: ["deletedAt", "createdAt", "updatedAt"],
				},
			});
			if (!allCarts) {
				return res.status(404).json("Error Getting Cart Items");
			}
			return res.status(200).json(allCarts);
		} else {
			const allCarts = await Cart.findAll({
				where: {
					user_id: id,
				},
				attributes: {
					exclude: ["deletedAt", "createdAt", "updatedAt"],
				},
			});
			if (!allCarts) {
				return res.status(404).json("Error Getting Cart Items");
			}
			return res.status(200).json(allCarts);
		}
	},
	addToCart: async (req, res) => {
		const { user_id, product_id, quantity } = req.body;
		const newItem = await Cart.create({
			user_id: user_id,
			product_id: product_id,
			quantity: quantity,
		});
		if (!newItem) {
			return res.status(404).json("Error Creating Cart Item");
		}
		return res.status(200).json("Cart Item Added");
	},
	update: async (req, res) => {
		const { user_id, product_id, quantity } = req.body;
		if (quantity <= 0) {
			const del = await Cart.destroy({
				where: {
					user_id: user_id,
					product_id: product_id,
				},
			});
			if (!del) {
				return res.status(404).json("Error Deleting Cart Item");
			}
			return res.status(200).json("Cart Item Deleted");
		}
		const up = await Cart.update(
			{
				quantity: quantity,
			},
			{
				where: {
					user_id: user_id,
					product_id: product_id,
				},
			}
		);
		if (!up) {
			return res.status(404).json("Error Updating Cart Item");
		}
		return res.status(200).json("Cart Item Updated");
	},
	removeFromCart: async (req, res) => {
		const { id } = req.params;
		const del = await Cart.destroy({
			where: {
				id: id,
			},
		});
		if (!del) {
			return res.status(404).json("Error Deleting Cart Item");
		}
		return res.status(200).json("Cart Item Deleted");
	},
};
