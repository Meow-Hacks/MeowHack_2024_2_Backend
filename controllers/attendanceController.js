const attendanceModel = require('../models/attendanceModel');

const getStudentAttendance = async (req, res) => {
    // #swagger.tags = ['Attendance']
    const {id} = req.params;

    try {
        const attendance = await attendanceModel.getStudentAttendance(id);
        res.status(200).json(attendance);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
}

const getLessonAttendance = async (req, res) => {
    // #swagger.tags = ['Attendance']
    const {id} = req.params;

    try {
        const attendance = await attendanceModel.getLessonAttendance(id);
        res.status(200).json(attendance);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
}

module.exports = {getStudentAttendance, getLessonAttendance};