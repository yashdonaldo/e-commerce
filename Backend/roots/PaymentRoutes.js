const express = require('express');
const {processPayment, paymentVarification} = require("../Controller/PaymentController");
const { isAuthenticateUser } = require("../middleware/auth");
const router = express.Router();

router.route("/process/payment").post( isAuthenticateUser, processPayment)
router.route("/paymentvarification").post(isAuthenticateUser, paymentVarification)

module.exports = router