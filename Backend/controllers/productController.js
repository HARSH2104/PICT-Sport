const db = require("../models/server");
// const paginationObj = require("../middlewares/pagination");

// const pagination = paginationObj.pagination;

const getAllProd = async (req, res) => {
  let prds = await db.products.findAll({});
  // console.log(res.totalProd);
  // res.send(res.resultset);
  res.send(prds);
};

const addProduct = async (req, res) => {
  // console.log("This is file", req.file);
  try {
    let prodobj = {
      name: req.body.name,
      image_url: req.file.filename,
      quantity: req.body.quantity,
    };
    let obj = await db.products.create(prodobj);
    res.send(obj);
  } catch (err) {
    res.json({ err });
  }
};

const findProductById = async (req, res) => {
  let req_id = req.params.id;
  const prod = await db.products.findOne({
    where: {
      id: req_id,
    },
  });
  res.send(prod);
};

module.exports = {
  getAllProd,
  addProduct,
  findProductById,
};
