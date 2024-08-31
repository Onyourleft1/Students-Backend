const ProductGallery = require("../models/ProductGallery");
// const jwt = require("jsonwebtoken");
// const { validator } = require("../Utils/Common");
const fs = require("fs").promises;
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.JWT_SECRET;

module.exports = {
	get: async (req, res) => {
		const { id } = req.params;
		const ProductGallerys = await ProductGallery.findAll({
			where: {
				product_id: id,
			},
			attributes: {
				exclude: ["deletedAt", "createdAt", "updatedAt"],
			},
		});
		if (!ProductGallerys) {
			return res.status(404).json("Error Getting Products File");
		}
		return res.status(200).json(ProductGallerys);
	},
	create: async (req, res) => {
		const { product_id } = req.body;
		const files = req.files;

		for (let i = 0; i < files.length; i++) {
			const file = await ProductGallery.create({
				product_id: product_id,
				name: files[i].originalname,
				path: files[i].path,
			});
			if (!file) {
				return res.status(404).json("Error in creating New Product Gallery");
			}
		}
		return res.status(200).json("Gallery Created");
	},
	delete: async (req, res) => {
		const { id } = req.params;
		const del = await ProductGallery.destroy({
			where: {
				id: id,
			},
		});
		if (!del) {
			return res.status(401).json("Error Deleting Image From Gallery");
		}
		return res.status(200).json("Image Deleted From Gallery Deleted");
	},
};
