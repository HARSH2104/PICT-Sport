//Pagination of model
const db = require("../models/server");
// const { connect } = require("../routes/productRoutes");

function paginationRes(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startindex = (page - 1) * limit;
    const endindex = page * limit;
    const resultset = {};

    // console.log(model.length);

    // if (endindex < model.length) {
    //   resultset.nextpage = {
    //     page: page + 1,
    //     limit: limit,
    //   };
    // }

    // if (startindex > 0) {
    //   resultset.previosPage = {
    //     page: page - 1,
    //     limit: limit,
    //   };
    // }

    try {
      resultset.resuser = await model.findAll({
        offset: startindex,
        limit: limit,
      });

      resultset.totalProd = await model.count();

      res.resultset = resultset;
      next();
    } catch (e) {
      res.json({ message: e.message });
    }
  };
}

module.exports = {
  pagination: paginationRes,
};
