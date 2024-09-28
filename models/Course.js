const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    resourceTitle: { type: String, required: true },
    resourceDescription: { type: String, required: true },
    resourceImage: { type: String, required: true },
    altResourceImage: { type: String, required: true },
    resourceLink: { type: String, required: true },
});

const topicSchema = new Schema({
    topicTitle: { type: String, required: true },
    topicImage: { type: String, required: true },
    altTopicImage: { type: String, required: true },
    resources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],
});

topicSchema.post("findOneAndDelete", async (topic) => {
    if (topic.resources.length) {
        let res = await Resource.deleteMany({ _id: { $in: topic.resources } });
        console.log(res);
    }
});

const courseSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    courseImage: { type: String, required: true },
    altCourseImage: { type: String, required: true },
    topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
});


courseSchema.post("findOneAndDelete", async (course) => {
    if (course.topics.length) {
        const topics = await Topic.find({ _id: { $in: course.topics } });
        
        for (let topic of topics) {
            if (topic.resources.length) {
                let res = await Resource.deleteMany({ _id: { $in: topic.resources } });
                console.log(res, topic.topicTitle);
            }
        }
        
        let res = await Topic.deleteMany({ _id: { $in: course.topics } });
        console.log(res);
    }
});

const Resource = mongoose.model("Resource", resourceSchema);
const Topic = mongoose.model("Topic", topicSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = { Course, Topic, Resource };
