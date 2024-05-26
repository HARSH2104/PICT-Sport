const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const User = require("../models/User");

// console.log('Defining userRoutes...');

router.get("/getAllUsers", userController.getUser);
router.post("/saveUser", userController.addUser);
router.get("/finduserbyid/:id", userController.findUserById);
router.post("/login", userController.login);
router.get(
  "/curuser",
  userController.authenticateToken,
  userController.loggedInUser
);
router.post("/createAdmin", userController.createAdmin);

// router.get('/getAllUsers', (req, res) => {
//   res.send('Hello from userRoutes!');
// });

module.exports = router;
