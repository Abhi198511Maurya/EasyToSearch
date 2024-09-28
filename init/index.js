const mongoose = require("mongoose");
const initData = require("./data.js");
const { Course, Topic, Resource } = require("../models/Course.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/Easy2Search";

main()
    .then(() => {
        console.log("Connected to DB");
        initDB();
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    try {
        await Resource.deleteMany({});
        await Topic.deleteMany({});
        await Course.deleteMany({});

        console.log("Old data was deleted");

        // Insert new data
        for (let course of initData.collection) {
            let savedTopics = [];

            for (let topic of course.topics) {
                let savedResources = [];

                for (let resource of topic.resources) {
                    const newResource = new Resource(resource);
                    await newResource.save();
                    savedResources.push(newResource._id);
                }

                const newTopic = new Topic({
                    ...topic,
                    resources: savedResources,
                });
                await newTopic.save();
                savedTopics.push(newTopic._id);
            }

            const newCourse = new Course({
                ...course,
                topics: savedTopics,
            });
            await newCourse.save();
        }

        console.log("Data was initialized successfully");
    } catch (error) {
        console.error("Error initializing database:", error);
    }
};
