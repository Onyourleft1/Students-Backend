const Front = require("../models/Front");
// const jwt = require("jsonwebtoken");
// const { validator } = require("../Utils/Common");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.JWT_SECRET;

module.exports = {
	get: async (req, res) => {
		const { id } = req.params;
		const Fronts = await Front.findOne({
			where: {
				id: id,
			},
			attributes: {
				exclude: ["deletedAt", "createdAt", "updatedAt"],
			},
		});
		if (!Fronts) {
			return res.status(404).json("Error Getting Front Settings");
		}
		return res.status(200).download(Fronts.path);
	},
};
