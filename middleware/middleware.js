const multer = require("multer");
// const fs = require("fs");
// const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(req);
    // const n = req.body.name.split(".").slice(0, -1).join(".");
    // fs.mkdir(`../uploads/ProductGalleries/${n}`, {
    // 	recursive: true,
    // });
    cb(null, `uploads`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage, enctype: "multipart/form-data" });

const storageG = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/ProductGalleries");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadG = multer({ storage: storageG, enctype: "multipart/form-data" });

module.exports = { upload, uploadG };
