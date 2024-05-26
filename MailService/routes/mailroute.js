const router = require("express").Router();
const mailcontroller = require("../controllers/mail");

router.post("/sendtestmail", mailcontroller.testMail);
router.post("/sendmail", mailcontroller.sendMail);

module.exports = router;
