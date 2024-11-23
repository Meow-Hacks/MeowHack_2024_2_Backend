const subjectsModel = require('../models/subjectsModel');

const getSubjects = async (req, res) => {
    // #swagger.tags = ['Subjects']
    try {
        const subjects = await subjectsModel.getSubjects();
        res.status(200).json(subjects);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const addSubject = async (req, res) => {
    // #swagger.tags = ['Subjects']
    const {name, default_auditory_id, duration} = req.body;

    if (!name) return res.status(400).json({message: "Name is required"});

    try {
        const newSubject = await subjectsModel.addSubject(name, default_auditory_id, duration);
        res.status(201).json(newSubject);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const updateSubject = async (req, res) => {
    // #swagger.tags = ['Subjects']
    const {id} = req.params;
    const {name, default_auditory_id, duration} = req.body;

    if (!name) return res.status(400).json({message: "Name is required"});

    try {
        const updatedSubject = await subjectsModel.updateSubject(id, name, default_auditory_id, duration);
        res.status(200).json(updatedSubject);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const deleteSubject = async (req, res) => {
    // #swagger.tags = ['Subjects']
    const {id} = req.params;

    try {
        const result = await subjectsModel.deleteSubject(id);
        if (!result) return res.status(404).json({message: "Subject not found"});
        res.status(200).json({message: "Subject deleted", branch: result});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getSubjects, addSubject, updateSubject, deleteSubject};