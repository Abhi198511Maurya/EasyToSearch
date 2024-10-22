const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/WrapAsync.js");
const { validateResource, validateTopic } = require("../middleware.js");
const { isLoggedIn, isAdmin } = require('../middleware.js');
const courseController = require("../controllers/courseController.js");

router.get('/', wrapAsync(courseController.renderTopicPage));

// TOPIC CREATION ROUTE
router.post("/", isAdmin, validateTopic, wrapAsync(courseController.createTopic));

router.get('/:topicName', isLoggedIn, wrapAsync(courseController.renderResourcePage));

// RESOURCE CREATION ROUTE
router.post("/:topicName", isAdmin, validateResource, wrapAsync(courseController.createResourse));


// DELETE COURSE
router.delete("/", isAdmin, wrapAsync(courseController.destroyCourse))

// DELETE TOPIC
router.delete("/:topicName", isAdmin, wrapAsync(courseController.destroyTopic))

// DELETE RESOURCES
router.delete("/:topicName/:id", isAdmin, wrapAsync(courseController.destroyResource));

module.exports = router;