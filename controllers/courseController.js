const { Course, Topic, Resource } = require("../models/Course.js");

module.exports.renderTopicPage = async (req, res) => {
    const { courseName } = req.params;
    const course = await Course.findOne({ name: courseName }).populate('topics').exec();
    res.render('pages/topicpage.ejs', { course });
}

module.exports.createTopic = async (req, res, next) => {
    let { courseName } = req.params;
    let newTopic = new Topic(req.body);
    const course = await Course.findOne({ name: courseName });
    course.topics.push(newTopic);
    await newTopic.save();
    await course.save();

    res.redirect(`/courses/${courseName}`);
}

module.exports.renderResourcePage = async (req, res) => {
    const { courseName, topicName } = req.params;

    const course = await Course.findOne({ name: courseName }).populate({
        path: 'topics',
        match: { topicTitle: topicName },
        populate: { path: 'resources' }
    }).exec();

    const topic = course.topics.find(t => t.topicTitle === topicName);

    res.render('pages/content.ejs', { topic, course });
}

module.exports.createResourse = async (req, res, next) => {
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
}

module.exports.destroyCourse = async (req, res) => {
    let { courseName } = req.params;
    const deletedCourse = await Course.findOneAndDelete({ name: courseName });
    res.redirect("/courses");
}

module.exports.destroyTopic = async (req, res) => {
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
}

module.exports.destroyResource = async (req, res) => {
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
}