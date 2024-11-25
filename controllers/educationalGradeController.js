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

module.exports = {getStudentGPA, getStudentPercentil};