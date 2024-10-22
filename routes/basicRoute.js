const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/WrapAsync.js");
const {validateCourse,isAdmin} = require("../middleware.js");
const basicController = require("../controllers/basicController.js");


router.get("/", basicController.index);

router.get("/courses", wrapAsync(basicController.coursePage));

// COURSE CREATION ROUTE
router.post("/courses", isAdmin, validateCourse, wrapAsync(basicController.createCourse));

router.get("/about", basicController.aboutPage);

router.get("/contact", basicController.contactPage);


module.exports = router;