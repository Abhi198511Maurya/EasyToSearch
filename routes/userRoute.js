const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/WrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const { renderSignup, signup, login, renderLogin, logout } = require("../controllers/userController.js");



router.get("/signup", renderSignup);

router.post("/signup", saveRedirectUrl, wrapAsync(signup));

router.get("/login", renderLogin);

router.post("/login", saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), login);

router.get("/logout", saveRedirectUrl, logout);

module.exports = router;