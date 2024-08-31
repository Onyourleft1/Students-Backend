const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
require("dotenv").config();
const sequelize = require("./database/database");

const ProductsRoute = require("./routes/Product");
const ProductsFilesRoute = require("./routes/ProductFile");
const ProductsGalleryRoute = require("./routes/ProductGallery");
const UserFilesRoute = require("./routes/UserFile");
const UsersRoute = require("./routes/User");
const CartsRoute = require("./routes/Cart");

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config();
const port = process.env.PORT;

app.listen(port, () => {
	console.log(`server running on http://localhost:${port}`);
});

sequelize
	.sync({
		force: false,
		alter: false,
	})
	.then(() => console.log("sync Successfully"))
	.catch((err) => console.log("Failed to Sync", err));

app.use("/Products", ProductsRoute);
app.use("/Users", UsersRoute);
app.use("/ProductsFiles", ProductsFilesRoute);
app.use("/ProductsGallery", ProductsGalleryRoute);
app.use("/UsersFiles", UserFilesRoute);
app.use("/Cart", CartsRoute);
