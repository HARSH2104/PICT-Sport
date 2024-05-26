const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transactionController");

router.post("/addTransac", transactionController.addTransaction);
router.post("/returnTrans", transactionController.returnTransac);
router.get("/getAllTransItem", transactionController.getAllTransactions);
router.get("/getAllTransItem/:id", transactionController.getAllTransByItemId);
router.get("/getAllTransUser/:id", transactionController.getAllTransByuserId);

module.exports = router;
