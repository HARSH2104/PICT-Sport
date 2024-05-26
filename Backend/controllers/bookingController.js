const db = require("../models/server");
const { Op } = db.sequelize;

const getAllBookings = async (req, res) => {
  const bookings = await db.bookings.findAll({
    include: [
      {
        model: db.user,
        attributes: ["name", "email", "registration_id"], // Specify user attributes you want to retrieve
      },
      {
        model: db.products,
        attributes: ["name"], // Specify item attributes you want to retrieve
      },
    ],
  });

  res.status(200).send(bookings);
};

const getBookingByUidItemId = async (req, res) => {
  // console.log(req.query.userId);
  // console.log(req.query.itemId);
  // console.log("-----------------hello======");
  const result = await db.bookings.findAll({
    where: {
      userId: req.query.userId,
      itemId: req.query.itemId,
    },
  });

  res.status(200).send(result);
};

const getUserBookings = async (req, res) => {
  let id = req.params.id;
  const result = await db.bookings.findAll({
    where: {
      userId: id,
    },

    include: [
      {
        model: db.user,
        attributes: ["name", "email", "registration_id"], // Specify user attributes you want to retrieve
      },
      {
        model: db.products,
        attributes: ["name"], // Specify item attributes you want to retrieve
      },
    ],
  });

  res.status(200).send(result);
};

module.exports = {
  getAllBookings,
  getBookingByUidItemId,
  getUserBookings,
};
