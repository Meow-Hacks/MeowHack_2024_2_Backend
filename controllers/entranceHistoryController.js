const entranceHistoryModel = require('../models/entranceHistoryModel');

const getEntranceHistoryStudent = async (req, res) => {
    // #swagger.tags = ['Entrance history']
    try {
        const students = await entranceHistoryModel.getStudentHistory();
        res.status(200).json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getEntranceHistoryTeacher = async (req, res) => {
    // #swagger.tags = ['Entrance history']
    try {
        const teachers = await entranceHistoryModel.getTeacherHistory();
        res.status(200).json(teachers);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getEntranceHistoryAdmin = async (req, res) => {
    // #swagger.tags = ['Entrance history']
    try {
        const admins = await entranceHistoryModel.getAdminHistory();
        res.status(200).json(admins);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getEntranceHistoryStaff = async (req, res) => {
    // #swagger.tags = ['Entrance history']
    try {
        const staff = await entranceHistoryModel.getStuffHistory();
        res.status(200).json(staff);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getEntranceHistoryStudent, getEntranceHistoryTeacher, getEntranceHistoryAdmin, getEntranceHistoryStaff};