const entryExitHistoryModel = require('../models/entryExitHistoryModel');

const getEntryExitHistoryStudent = async (req, res) => {
    // #swagger.tags = ['Entry Exit history']
    try {
        const students = await entryExitHistoryModel.getStudentHistory();
        res.status(200).json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getEntryExitHistoryTeacher = async (req, res) => {
    // #swagger.tags = ['Entry Exit history']
    try {
        const teachers = await entryExitHistoryModel.getTeacherHistory();
        res.status(200).json(teachers);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getEntryExitHistoryAdmin = async (req, res) => {
    // #swagger.tags = ['Entry Exit history']
    try {
        const admins = await entryExitHistoryModel.getAdminHistory();
        res.status(200).json(admins);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getEntryExitHistoryStaff = async (req, res) => {
    // #swagger.tags = ['Entry Exit history']
    try {
        const staff = await entryExitHistoryModel.getStuffHistory();
        res.status(200).json(staff);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getEntryExitHistoryStudent, getEntryExitHistoryTeacher, getEntryExitHistoryAdmin, getEntryExitHistoryStaff};