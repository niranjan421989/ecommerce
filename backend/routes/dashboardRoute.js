const express =require("express");
const { getAllDashboardQuery } = require("../controllers/dashboardController");
const { isAuthenticatedUser, authorizeRoles } = require("../middelware/auth")

const router =express.Router();

//router.route("/dashboard").get(isAuthenticatedUser, getAllDashboardQuery);
router.route("/dashboard").get(isAuthenticatedUser, authorizeRoles("admin"), getAllDashboardQuery);

module.exports = router