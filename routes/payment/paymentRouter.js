const express = require("express");
const { createPayment } = require("../../controller/payment/paymentController");
const checkedLogin = require("../../middlewares/checkedLogin");

const router = express.Router();

router.post("/create-payment-intent", checkedLogin, createPayment);

module.exports = router;
