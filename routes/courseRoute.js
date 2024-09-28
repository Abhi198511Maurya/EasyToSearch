const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/WrapAsync.js");
const { Course, Topic, Resource } = require("../models/Course.js");
const {validateResource,validateTopic} = require("../middleware.js");
const { isLoggedIn, isAdmin } = require('../middleware.js');


router.get('/', wrapAsync(async (req, res) => {
    const { courseName } = req.params;
    const course = await Course.findOne({ name: courseName }).populate('topics').exec();
    res.render('pages/topicpage.ejs', { course });
}));

// TOPIC CREATION ROUTE
router.post("/", isAdmin, validateTopic, wrapAsync(async (req, res, next) => {
    let { courseName } = req.params;
    let newTopic = new Topic(req.body);
    const course = await Course.findOne({ name: courseName });
    course.topics.push(newTopic);
    await newTopic.save();
    await course.save();

    res.redirect(`/courses/${courseName}`);
}));

router.get('/:topicName', isLoggedIn, wrapAsync(async (req, res) => {
    const { courseName, topicName } = req.params;

    const course = await Course.findOne({ name: courseName }).populate({
        path: 'topics',
        match: { topicTitle: topicName },
        populate: { path: 'resources' }
    }).exec();

    const topic = course.topics.find(t => t.topicTitle === topicName);

    res.render('pages/content.ejs', { topic, course });
}));

// RESOURCE CREATION ROUTE
router.post("/:topicName", isAdmin, validateResource, wrapAsync(async (req, res, next) => {
    let { topicName, courseName } = req.params;
    let newResource = new Resource(req.body);
    const course = await Course.findOne({ name: courseName }).populate({
        path: 'topics',
        match: { topicTitle: topicName },
        populate: { path: 'resources' }
    }).exec();
    const topic = course.topics.find(t => t.topicTitle === topicName);
    topic.resources.push(newResource);
    await newResource.save();
    await topic.save();
    await course.save();
    res.redirect(`/courses/${courseName}/${topicName}`);
}));


// DELETE COURSE
router.delete("/", isAdmin, wrapAsync(async (req, res) => {
    let { courseName } = req.params;
    const deletedCourse = await Course.findOneAndDelete({ name: courseName });
    res.redirect("/courses");
}))

// DELETE TOPIC
router.delete("/:topicName", isAdmin, wrapAsync(async (req, res) => {
    let { topicName, courseName } = req.params;
    const deletedTopic = await Topic.findOneAndDelete({ topicTitle: topicName });
    if (deletedTopic) {
        await Course.updateOne(
            { name: courseName },
            { $pull: { topics: deletedTopic._id } } // Remove topic ID from course
        );
        console.log(`Topic ${deletedTopic._id} removed from course ${courseName}`);
    }
    res.redirect(`/courses/${courseName}`);
}))

// DELETE RESOURCES
router.delete("/:topicName/:id", isAdmin, wrapAsync(async (req, res) => {
    let { topicName, courseName, id } = req.params;
    const deletedResource = await Resource.findByIdAndDelete(id);
    if (deletedResource) {
        await Topic.updateOne(
            { topicTitle: topicName },
            { $pull: { resources: id } } // Remove resource ID from topic
        );
        console.log(`Resource ${id} removed from topic ${topicName}`);
    }
    res.redirect(`/courses/${courseName}/${topicName}`);
}));

module.exports = router;