const express = require('express');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const basicRoute = require('./routes/basicRoute.js');
const courseRoute = require('./routes/courseRoute.js');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const ExpressError = require("./utils/ExpressError.js")
const methodOverride = require("method-override");
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User.js');
const user = require('./routes/userRoute.js');


const MONGO_URL = "mongodb://127.0.0.1:27017/Easy2Search";

main().then(() => {
    console.log('connected to DB');
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.use(methodOverride('_method'));

app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));

const secretOption = {
    secret: "mysecretsessioncode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,  //for one week 
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    }
}

app.use(session(secretOption));
app.use(flash());

//after session middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// store error and success massege in locals
app.use((req,res,next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// MiddleWare for all routes
app.use("/",basicRoute);
app.use("/courses/:courseName",courseRoute);
app.use("/",user);


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

// CUSTOM ERROR HANDLER
app.use((err, req, res, next) => {
    let { status = 500, message = "some error occured" } = err;
    // res.status(status).send(message);
    res.status(status).render("error.ejs", { message });
}); 

app.listen(8080, () => {
    console.log("server listing at port");
});