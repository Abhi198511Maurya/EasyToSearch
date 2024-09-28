const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/WrapAsync.js");
const { Course} = require("../models/Course.js");
const {validateCourse,isAdmin} = require("../middleware.js");

router.get("/", (req, res) => {
    res.render("pages/index.ejs");
});

router.get("/courses", wrapAsync(async (req, res) => {
    let allCourses = await Course.find();
    res.render("pages/courses.ejs", { allCourses });
}));

// COURSE CREATION ROUTE
router.post("/courses", isAdmin, validateCourse, wrapAsync(async (req, res, next) => {
    let newCourse = new Course(req.body);
    await newCourse.save();
    res.redirect("/courses");
}));

router.get("/about", (req, res) => {
    res.render("pages/about.ejs");
});

router.get("/contact", (req, res) => {
    res.render("pages/contact.ejs");
});


module.exports = router;