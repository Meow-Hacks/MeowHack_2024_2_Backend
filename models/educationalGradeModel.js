const dbPool = require("../config/db");

const getStudentGPA = async (student_id) => {
    const query = `SELECT *
                   FROM calculate_gpa(student := $1)`;
    const {rows} = await dbPool.query(query, [student_id]);
    return rows[0];
};

const getStudentPercentil = async (student_id) => {
    const query = `SELECT SUM(CASE WHEN gpa > calculate_gpa(student := $1) THEN 1 ELSE 0 END)::FLOAT / COUNT(*) *
                          100 AS ratio_above_average
                   FROM (SELECT calculate_gpa(s.id)                                 AS gpa,
                                (SELECT AVG(calculate_gpa(s2.id)) FROM students s2) AS avg_gpa
                         FROM students AS s) AS all_s_gpa;`
    const {rows} = await dbPool.query(query, [student_id]);
    return rows[0];
}

module.exports = {getStudentGPA, getStudentPercentil};