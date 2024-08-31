const UserFile = require("../models/UserFile");
// const jwt = require("jsonwebtoken");
// const { validator } = require("../Utils/Common");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.JWT_SECRET;

module.exports = {
	get: async (req, res) => {
		const { id } = req.params;
		const UserFiles = await UserFile.findOne({
			where: {
				user_id: id,
			},
			attributes: {
				exclude: ["deletedAt", "createdAt", "updatedAt"],
			},
		});
		if (!UserFiles) {
			return res.status(404).json("Error Getting Users File");
		}
		return res.status(200).download(UserFiles.path);
	},
};
