const User = require('../models/User.js');



module.exports.renderSignup = (req, res) => {
    res.render("user/signup.ejs");
}

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            req.flash("error", "A user with the given username or email is already registered!");
            return res.redirect("/signup");
        }

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
}

module.exports.renderLogin = (req, res) => {
    res.render("user/login.ejs");
}

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Easy To Search!");
    let redirectUrl = res.locals.redirectUrl || "/";
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out!");
        let redirectUrl = res.locals.redirectUrl || "/";
        res.redirect(redirectUrl);
    });
}