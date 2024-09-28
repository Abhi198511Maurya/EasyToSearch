const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/WrapAsync.js');
const User = require('../models/User.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');



router.get("/signup", (req, res) => {
    res.render("user/signup.ejs");
});

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome back to Easy To Search!");
            let redirectUrl = res.locals.redirectUrl || "/";
            res.redirect(redirectUrl);
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}));

router.get("/login", (req, res) => {
    res.render("user/login.ejs");
});

router.post("/login", saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), async (req, res) => {
    req.flash("success", "Welcome back to Easy To Search!");
    let redirectUrl = res.locals.redirectUrl || "/";
    res.redirect(redirectUrl);
});

router.get("/logout", saveRedirectUrl, (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out!");
        let redirectUrl = res.locals.redirectUrl || "/";
        res.redirect(redirectUrl);
    });
});

module.exports = router;