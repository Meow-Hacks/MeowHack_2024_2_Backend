const auditoriesModel = require('../models/auditoryModel');

const getAuditories = async (req, res) => {
    // #swagger.tags = ['Auditories']
    // #swagger.description = 'rooms or all admins only'
    try {
        const auditories = await auditoriesModel.getAuditories();
        res.status(200).json(auditories);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const addAuditories = async (req, res) => {
    // #swagger.tags = ['Auditories']
    // #swagger.description = 'rooms or all admins only'
    const {name, capacity, branch_id} = req.body;
    if (!name) return res.status(400).json({message: "Name is required"});

    try {
        const newAuditory = await auditoriesModel.addAuditory(name, capacity, branch_id);
        res.status(201).json(newAuditory);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const updateAuditories = async (req, res) => {
    // #swagger.tags = ['Auditories']
    // #swagger.description = 'rooms or all admins only'
    const {id} = req.params;
    const {name, capacity, branch_id} = req.body;
    if (!name) return res.status(400).json({message: "Name is required"});

    try {
        const updatedAuditory = await auditoriesModel.updateAuditory(id, name, capacity, branch_id);
        res.status(200).json(updatedAuditory);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const deleteAuditories = async (req, res) => {
    // #swagger.tags = ['Auditories']
    // #swagger.description = 'rooms or all admins only'
    const {id} = req.params;

    try {
        const result = await auditoriesModel.deleteAuditory(id);
        if (!result) return res.status(404).json({message: "Auditory not found"});
        res.status(200).json({message: "Auditory deleted", branch: result});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getAuditories, addAuditories, updateAuditories, deleteAuditories};