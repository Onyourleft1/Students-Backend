const ProductFile = require("../models/ProductFile");
// const jwt = require("jsonwebtoken");
// const { validator } = require("../Utils/Common");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.JWT_SECRET;

module.exports = {
	get: async (req, res) => {
		const { id } = req.params;
		// const multi = await ProductFile.findAll({
		// 	where: {
		// 		product_id: id,
		// 	},
		// 	attributes: {
		// 		exclude: ["deletedAt", "createdAt", "updatedAt"],
		// 	},
		// });
		// if (!multi) {
		// 	return res.status(404).json("Error Getting Products Files Number");
		// }
		// if (multi.length === 1) {
		const ProductFiles = await ProductFile.findOne({
			where: {
				product_id: id,
			},
			attributes: {
				exclude: ["deletedAt", "createdAt", "updatedAt"],
			},
		});
		if (!ProductFiles) {
			return res.status(404).json("Error Getting Products File");
		}
		return res.status(200).download(ProductFiles.path);
		// }
		// if (multi.length > 1) {
		// 	let paths = [];
		// 	for (let index = 0; index < multi.length; index++) {
		// 		paths.push(multi[index].path);
		// 	}
		// 	return res.status(200).json({ paths: paths });
		// }
	},
};
