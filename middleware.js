const { courseSchema, topicSchema, resourceSchema } = require("./Schema.js");
const User = require("./models/User.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req,res,next)=>{
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in!");
        return res.redirect("/login");
    }
    next();
}


module.exports.isAdmin = async (req,res,next)=>{
    let redirectUrl = req.originalUrl || "/";
    
    if(!res.locals.currUser || !res.locals.currUser._id.equals("66f6f0e9a88a472ee64de432")){
        req.flash("error", "You are not admin!");
        return res.redirect(redirectUrl);
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next)=>{
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.validateCourse = (req, res, next) => {
    let result = courseSchema.validate(req.body);
    if (result.error) {
        throw new ExpressError(400, result.error);
    } else {
        next();
    }
}
module.exports.validateTopic = (req, res, next) => {
    let result = topicSchema.validate(req.body);
    if (result.error) {
        throw new ExpressError(400, result.error);
    } else {
        next();
    }
}
module.exports.validateResource = (req, res, next) => {
    let result = resourceSchema.validate(req.body);
    if (result.error) {
        throw new ExpressError(400, result.error);
    } else {
        next();
    }
}