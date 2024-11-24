const accessControlModel = require('../models/accessControlModel');

const getAuditoryAccessesTeachersId = async (req, res) => {
    // #swagger.tags = ['Access Control']
    // #swagger.description = 'get accesses by teacher id (rooms or all admins only)'
    const {id} = req.params;

    try {
        const access = await accessControlModel.getAuditoryAccessesTeachersId(id);
        res.status(200).json(access);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getAuditoryAccessesAdminsId = async (req, res) => {
    // #swagger.tags = ['Access Control']
    // #swagger.description = 'get accesses by admin id (rooms or all admins only)'
    const {id} = req.params;

    try {
        const access = await accessControlModel.getAuditoryAccessesAdminsId(id);
        res.status(200).json(access);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getAuditoryAccessesStaffId = async (req, res) => {
    // #swagger.tags = ['Access Control']
    // #swagger.description = 'get accesses by staff id (rooms or all admins only)'
    const {id} = req.params;

    try {
        const access = await accessControlModel.getAuditoryAccessesStaffId(id);
        res.status(200).json(access);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getAuditoryIdAccessesTeachers = async (req, res) => {
    // #swagger.tags = ['Access Control']
    // #swagger.description = 'get teachers with access by auditory id (rooms or all admins only)'
    const {id} = req.params;

    try {
        const access = await accessControlModel.getAuditoryIdAccessesTeachers(id);
        res.status(200).json(access);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getAuditoryIdAccessesAdmins = async (req, res) => {
    // #swagger.tags = ['Access Control']
    // #swagger.description = 'get admins with access by auditory id (rooms or all admins only)'
    const {id} = req.params;

    try {
        const access = await accessControlModel.getAuditoryIdAccessesAdmins(id);
        res.status(200).json(access);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getAuditoryIdAccessesStaff = async (req, res) => {
    // #swagger.tags = ['Access Control']
    // #swagger.description = 'get staff with access by auditory id (rooms or all admins only)'
    const {id} = req.params;

    try {
        const access = await accessControlModel.getAuditoryIdAccessesStaff(id);
        res.status(200).json(access);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {
    getAuditoryAccessesTeachersId,
    getAuditoryAccessesAdminsId,
    getAuditoryAccessesStaffId,
    getAuditoryIdAccessesTeachers,
    getAuditoryIdAccessesAdmins,
    getAuditoryIdAccessesStaff
};