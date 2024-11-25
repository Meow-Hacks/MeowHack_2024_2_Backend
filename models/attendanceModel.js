const dbPool = require("../config/db");

const getStudentAttendance = async (id) => {
    const query = `SELECT *
                   FROM attendance WHERE student_id = $1`;
    const {rows} = await dbPool.query(query, [id]);
    return rows;
};

const getLessonAttendance = async (id) => {
    const query = `SELECT *
                   FROM attendance WHERE lesson_id = $1`;
    const {rows} = await dbPool.query(query, [id]);
    return rows;
};


module.exports = {getStudentAttendance, getLessonAttendance};