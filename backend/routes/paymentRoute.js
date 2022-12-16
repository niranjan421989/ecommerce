const express = require("express");
const { processPayment, sendStripeApikey } = require("../controllers/paymentControllers");
const router = express.Router();
const { isAuthenticatedUser } = require("../middelware/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApikey);

module.exports = router;