const express = require("express");
const db = require("../models/server");
const router = express.Router();
const productController = require("../controllers/productController");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "frontend/public/Images",
  filename: (req, file, cb) => {
    // console.log("the file is", file);
    return cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// const upload = multer({ dest: 'images/' }).single('image_url');

router.get("/getAllItems", productController.getAllProd);

router.post(
  "/addItem",
  upload.single("image_url"),
  productController.addProduct
);

router.get("/findItembyid/:id", productController.findProductById);

module.exports = router;
