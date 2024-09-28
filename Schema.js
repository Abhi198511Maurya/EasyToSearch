const Joi = require("joi");

module.exports.courseSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    courseImage: Joi.string().required(),
    altCourseImage: Joi.string().required(),
});
module.exports.topicSchema = Joi.object({
    topicTitle: Joi.string().required(),
    topicImage: Joi.string().required(),
    altTopicImage: Joi.string().required(),
});
module.exports.resourceSchema = Joi.object({
    resourceTitle: Joi.string().required(),
    resourceDescription: Joi.string().required(),
    resourceLink: Joi.string().required(),
    resourceImage: Joi.string().required(),
    altResourceImage: Joi.string().required(),
});