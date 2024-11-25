const educationalGradeModel = require('../models/educationalGradeModel');

const getStudentGPA = async (req, res) => {
    // #swagger.tags = ['Educational Grade']
    // #swagger.description = 'lessons or all admins only'
    try {
        const {id} = req.params;
        const result = await educationalGradeModel.getStudentGPA(id);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getStudentPercentil = async (req, res) => {
    // #swagger.tags = ['Educational Grade']
    // #swagger.description = 'lessons or all admins only'
    try {
        const {id} = req.params;
        const result = await educationalGradeModel.getStudentPercentil(id);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getMarksByGroupId = async (req, res) => {
    // #swagger.tags = ['Educational Grade']
    // #swagger.description = 'lessons or all admins only'
    /* #swagger.responses[200] = {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                        student_id: { type: "integer" },
                        name: { type: "string" },
                        secondname: { type: "string" },
                        lastname: { type: "string" },
                        lesson_id: { type: "integer" },
                        mark: { type: "integer" },
                        subject_id: { type: "integer" }
                    }
                  }
                }
              }
            }
          } */
    try {
        const {id} = req.params;
        const result = await educationalGradeModel.getMarksByGroupId(id);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getStudentGPA, getStudentPercentil, getMarksByGroupId};