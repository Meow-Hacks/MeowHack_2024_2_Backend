const accessHistoryModel = require('../models/accessHistoryModel');

const getAuditoryAccessesHistoryTeachersId = async (req, res) => {
    // #swagger.tags = ['Access History']
    // #swagger.description = 'get accesses history by teacher id'
    const {id} = req.params;

    try {
        const access = await accessHistoryModel.getAuditoryAccessesHistoryTeachersId(id);
        res.status(200).json(access);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getAuditoryAccessesHistoryAdminsId = async (req, res) => {
    // #swagger.tags = ['Access History']
    // #swagger.description = 'get accesses history by admin id'
    const {id} = req.params;

    try {
        const access = await accessHistoryModel.getAuditoryAccessesHistoryAdminsId(id);
        res.status(200).json(access);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getAuditoryAccessesHistoryStaffId = async (req, res) => {
    // #swagger.tags = ['Access History']
    // #swagger.description = 'get accesses history by staff id'
    const {id} = req.params;

    try {
        const access = await accessHistoryModel.getAuditoryAccessesHistoryStaffId(id);
        res.status(200).json(access);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getAuditoryIdAccessesHistoryTeachers = async (req, res) => {
    // #swagger.tags = ['Access History']
    // #swagger.description = 'get previous teachers with access by auditory id'
    const {id} = req.params;

    try {
        const access = await accessHistoryModel.getAuditoryIdAccessesHistoryTeachers(id);
        res.status(200).json(access);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getAuditoryIdAccessesHistoryAdmins = async (req, res) => {
    // #swagger.tags = ['Access History']
    // #swagger.description = 'get previous admins with access by auditory id'
    const {id} = req.params;

    try {
        const access = await accessHistoryModel.getAuditoryIdAccessesHistoryAdmins(id);
        res.status(200).json(access);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getAuditoryIdAccessesHistoryStaff = async (req, res) => {
    // #swagger.tags = ['Access History']
    // #swagger.description = 'get previous staff with access by auditory id'
    const {id} = req.params;

    try {
        const access = await accessHistoryModel.getAuditoryIdAccessesHistoryStaff(id);
        res.status(200).json(access);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {
    getAuditoryAccessesHistoryTeachersId,
    getAuditoryAccessesHistoryAdminsId,
    getAuditoryAccessesHistoryStaffId,
    getAuditoryIdAccessesHistoryTeachers,
    getAuditoryIdAccessesHistoryAdmins,
    getAuditoryIdAccessesHistoryStaff
};