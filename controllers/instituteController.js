const institutesModel = require('../models/instituteModel');

const getInstitutes = async (req, res) => {
    // #swagger.tags = ['Institutes']
    // #swagger.description = 'lessons or all admins only'
    try {
        const institutes = await institutesModel.getInstitutes();
        res.status(200).json(institutes);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getInstituteById = async (req, res) => {
    // #swagger.tags = ['Institutes']
    // #swagger.description = 'lessons or all admins only'
    try {
        const {id} = req.params;
        const institutes = await institutesModel.getInstituteById(id);
        res.status(200).json(institutes);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const addInstitutes = async (req, res) => {
    // #swagger.tags = ['Institutes']
    // #swagger.description = 'lessons or all admins only'
    const {name, branch_id} = req.body;

    if (!name) return res.status(400).json({message: "Name is required"});

    try {
        const newInstitute = await institutesModel.addInstitute(name, branch_id);
        res.status(201).json(newInstitute);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const updateInstitutes = async (req, res) => {
    // #swagger.tags = ['Institutes']
    // #swagger.description = 'lessons or all admins only'
    const {id} = req.params;
    const {name, branch_id} = req.body;

    if (!name) return res.status(400).json({message: "Name is required"});

    try {
        const updatedInstitute = await institutesModel.updateInstitute(id, name, branch_id);
        res.status(200).json(updatedInstitute);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const deleteInstitutes = async (req, res) => {
    // #swagger.tags = ['Institutes']
    // #swagger.description = 'lessons or all admins only'
    const {id} = req.params;

    try {
        const result = await institutesModel.deleteInstitute(id);
        if (!result) return res.status(404).json({message: "Institute not found"});
        res.status(200).json({message: "Institute deleted", institute: result});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getInstitutes, getInstituteById, addInstitutes, updateInstitutes, deleteInstitutes};