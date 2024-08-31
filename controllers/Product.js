const Product = require("../models/Product");
const ProductFile = require("../models/ProductFile");
// const jwt = require("jsonwebtoken");
// const { validator } = require("../Utils/Common");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.JWT_SECRET;

module.exports = {
  get: async (req, res) => {
    const id = req.query.id;
    if (!id) {
      const allProducts = await Product.findAll({
        attributes: {
          exclude: ["deletedAt", "createdAt", "updatedAt"],
        },
      });
      if (!allProducts) {
        return res.status(404).json("Error Getting Products");
      }
      return res.status(200).json(allProducts);
    } else {
      const allProducts = await Product.findOne({
        where: {
          id: id,
        },
        attributes: {
          exclude: ["deletedAt", "createdAt", "updatedAt"],
        },
      });
      if (!allProducts) {
        return res.status(404).json("Error Getting Products");
      }
      return res.status(200).json(allProducts);
    }
  },
  create: async (req, res) => {
    const { name, price, description, quantity } = req.body;
    const { originalname, path } = req.file;
    // const files = req.files;
    const newProduct = await Product.create({
      name: name,
      price: price,
      description: description,
      quantity: quantity,
    });
    if (!newProduct) {
      return res.status(404).json("Error in creating New Product");
    }
    // if (files && files.length > 0) {
    // 	// Create a promise array to handle all file creations
    // 	const fileCreationPromises = files.map((file) => {
    // 		return ProductFile.create({
    // 			product_id: newProduct.id,
    // 			name: file.originalname,
    // 			path: file.path,
    // 		});
    // 	});

    // 	// Wait for all the ProductFile creation operations to complete
    // 	const createdFiles = await Promise.all(fileCreationPromises);

    // 	// Check if any of the file creations failed
    // 	const allFilesCreated = createdFiles.every((file) => file != null);
    // 	if (!allFilesCreated) {
    // 		return res
    // 			.status(404)
    // 			.json("Error in creating one or more ProductFiles");
    // 	}
    // 	return res.status(200).json("Product Added");
    // } else {
    // 	// No files to process
    // 	return res.status(400).json("No files provided");
    // }

    const file = await ProductFile.create({
      product_id: newProduct.id,
      name: originalname,
      path: path,
    });
    if (!file) {
      return res.status(404).json("Error in creating New ProductFile");
    }
    return res.status(200).json("Product Added");
  },
  update: async (req, res) => {
    const { id, name, price, description, quantity } = req.body;

    const updatedProduct = await Product.update(
      {
        name: name,
        price: price,
        description: description,
        quantity: quantity,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (!updatedProduct) {
      return res.status(404).json("Error in Updating the Product");
    }
    if (req.file) {
      const { originalname, path } = req.file;
      const file = await ProductFile.update(
        {
          name: originalname,
          path: path,
        },
        {
          where: {
            product_id: id,
          },
        }
      );
      if (!file) {
        return res.status(404).json("Error in creating New ProductFile");
      }
    }

    return res.status(200).json("Product Updated");
  },
  delete: async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const deletProduct = await Product.destroy({
      where: {
        id: id,
      },
    });
    if (!deletProduct) {
      return res.status(404).json("Error Deleting Product");
    }
    const delImgs = await ProductFile.destroy({
      where: {
        id: id,
      },
    });
    if (!delImgs) {
      return res.status(404).json("Error Deleting Product Images");
    }
    return res.status(200).json("Product Deleted");
  },
};
