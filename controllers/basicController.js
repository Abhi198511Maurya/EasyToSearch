const { Course} = require("../models/Course.js");

module.exports.index = (req, res) => {
    res.render("pages/index.ejs");
}

module.exports.coursePage = async (req, res) => {
    let allCourses = await Course.find();
    res.render("pages/courses.ejs", { allCourses });
}

module.exports.createCourse = async (req, res, next) => {
    let newCourse = new Course(req.body);
    await newCourse.save();
    res.redirect("/courses");
}

module.exports.aboutPage = (req, res) => {
    res.render("pages/about.ejs");
}

module.exports.contactPage = (req, res) => {
    res.render("pages/contact.ejs");
}