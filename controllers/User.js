const User = require("../models/User");
const UserFile = require("../models/UserFile");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.JWT_SECRET;

module.exports = {
	get: async (req, res) => {
		const allUsers = await User.findAll({
			attributes: {
				exclude: ["deletedAt", "createdAt", "updatedAt"],
			},
		});
		if (!allUsers) {
			return res.status(404).json("Error Getting Users");
		}
		return res.status(200).json(allUsers);
	},
	create: async (req, res) => {
		const { first_name, last_name, username, email, password } = req.body;
		const { originalname, path } = req.file;
		const newUser = await User.create({
			first_name: first_name,
			last_name: last_name,
			username: username,
			email: email,
			password: password,
		});
		if (!newUser) {
			return res.status(404).json("Error in creating New User");
		}
		const file = await UserFile.create({
			user_id: newUser.id,
			name: originalname,
			path: path,
		});
		if (!file) {
			return res.status(404).json("Error in creating New UserFile");
		}
		return res.status(200).json("User Added");
	},
	update: async (req, res) => {
		const { id, first_name, last_name, username, email, password } = req.body;
		const updatedUser = await User.update(
			{
				first_name: first_name,
				last_name: last_name,
				username: username,
				email: email,
				password: password,
			},
			{
				where: {
					id: id,
				},
			}
		);
		if (!updatedUser) {
			return res.status(404).json("Error in Updating the User");
		}
		return res.status(200).json("User Updated");
	},
	delete: async (req, res) => {
		const { id } = req.params;
		console.log(id);
		const deletUser = await User.destroy({
			where: {
				id: id,
			},
		});
		if (!deletUser) {
			return res.status(404).json("Error Deleting User");
		}
		const delImgs = await UserFile.destroy({
			where: {
				id: id,
			},
		});
		if (!delImgs) {
			return res.status(404).json("Error Deleting User Images");
		}
		return res.status(200).json("User Deleted");
	},
	login: async (req, res) => {
		const { email, password } = req.body;
		const Admin = await User.findOne({
			where: {
				email: email,
				password: password,
			},
		});
		if (!Admin) {
			return res.status(404).json({ message: "Invalid Credentials" });
		}
		// const comp = await bcrypt.compare(password, Admin.password);
		// if (!comp) {
		// 	return res.status(404).json({ message: "Invalid Credentials" });
		// }
		const payload = {
			id: Admin.id,
		};

		const tkn = jwt.sign(payload, secretKey);
		res.cookie("token", tkn, {
			httpOnly: true, // Cookie accessible only by the web server
			secure: true, // Works in HTTPS environments
			sameSite: "Strict", // Restricts the cookie to be sent in same-site requests
			maxAge: 900000,
		});
		return res.status(200).json({token:tkn});
	},
	getLoginInfo: async (req, res) => {
		const { token } = req.body;
		const verify=jwt.verify(token,secretKey)
		if(verify){
			const loggedInUser = await User.findOne({
				where: {
					id: verify.id,
				},
				attributes: {
					exclude: ["password", "deletedAt"],
				},
			});
			if (!loggedInUser) {
				return res.status(404).json("User Info Not Found");
			}
			return res.status(200).json(loggedInUser);
		}
		else{
			return res.status(403).json("Error in verifying token")
		}

	},
	logout: async (req, res) => {
		res.clearCookie("token");
		res.status(200).json({ message: "You Logged Out" });
	},
};
