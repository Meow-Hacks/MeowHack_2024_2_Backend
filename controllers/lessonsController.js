const lessonModel = require('../models/lessonsModel');

const getLessons = async (req, res) => {
    // #swagger.tags = ['Lessons']
    // #swagger.description = 'lessons or all admins only'
    /* #swagger.responses[200] = {
       content: {
         "application/json": {
           schema: {
             type: "array",
             items: {
               type: "object",
               properties: {
                 id: {type: "integer" },
                 subject_id: { type: "string" },
                 group_id: { type: "string" },
                 auditory_id: { type: "string" },
                 teacher_id: { type: "integer" },
                 start_time: { type: "string", format: "date-time" },
                 end_time: { type: "string", format: "date-time" },
                 type_of_lesson: { type: "string" }
               }
             }
           }
         }
       }
     } */
    try {
        const lessons = await lessonModel.getLessons();
        res.status(200).json(lessons);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getLessonById = async (req, res) => {
    // #swagger.tags = ['Lessons']
    // #swagger.description = 'lessons or all admins only'
    /* #swagger.responses[200] = {
       content: {
         "application/json": {
           schema: {
             type: "object",
               properties: {
                 id: {type: "integer" },
                 subject_id: { type: "string" },
                 group_id: { type: "string" },
                 auditory_id: { type: "string" },
                 teacher_id: { type: "integer" },
                 start_time: { type: "string", format: "date-time" },
                 end_time: { type: "string", format: "date-time" },
                 type_of_lesson: { type: "string" }
               }
           }
         }
       }
     } */
    try {
        const {id} = req.params;
        const lessons = await lessonModel.getLessonById(id);
        res.status(200).json(lessons);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const addLessons = async (req, res) => {
    // #swagger.tags = ['Lessons']
    // #swagger.description = 'lessons or all admins only'
    /* #swagger.requestBody = {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      subject_id: { type: "string" },
                      group_id: { type: "string" },
                      auditory_id: { type: "string" },
                      teacher_id: { type: "integer" },
                      start_time: { type: "string", format: "date-time" },
                      end_time: { type: "string", format: "date-time" },
                      type_of_lesson: { type: "string" }
                    },
                    required: ["subject_id", "group_id", "auditory_id", "teacher_id", "start_time", "end_time", "type_of_lesson"]
                  }
                }
              }
            }
          } */
    const lessons = req.body;

    if (!lessons || !Array.isArray(lessons)) {
        return res.status(400).json({message: "Lessons list is required and must be an array"});
    }

    try {
        const results = await lessonModel.addLessons(lessons);
        res.status(201).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const updateLesson = async (req, res) => {
    // #swagger.tags = ['Lessons']
    // #swagger.description = 'lessons or all admins only'
    const {id} = req.params;
    const {subject_id, group_id, auditory_id, teacher_id, start_time, end_time, type_of_lesson} = req.body;

    try {
        const lesson = await lessonModel.updateLesson(id, {
            subject_id,
            group_id,
            auditory_id,
            teacher_id,
            start_time,
            end_time,
            type_of_lesson
        });
        if (lesson.length === 0) return res.status(404).json({message: "Lesson not found"});
        res.status(200).json(lesson);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const deleteLesson = async (req, res) => {
    // #swagger.tags = ['Lessons']
    // #swagger.description = 'lessons or all admins only'
    const {id} = req.params;

    try {
        const lesson = await lessonModel.deleteLesson(id);
        if (lesson.length === 0) return res.status(404).json({message: "Lesson not found"});
        res.status(200).json({message: "Lesson deleted", admin: lesson});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getLessons, getLessonById, addLessons, updateLesson, deleteLesson};