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

const getMarksByGroupId = async (group_id) => {
    const query = `SELECT s.id   AS student_id,
                          s.name,
                          s.secondname,
                          s.lastname,
                          m.lesson_id,
                          m.mark,
                          sub.id AS subject_id
                   FROM groups g
                            JOIN
                        students s ON g.id = s.group_id
                            JOIN
                        mark m ON s.id = m.student_id
                            JOIN
                        lessons l ON m.lesson_id = l.id
                            JOIN
                        subjects sub ON l.subject_id = sub.id
                   WHERE g.id = $1;
    `;
    const {rows} = await dbPool.query(query, [group_id]);
    return rows;
};

module.exports = {getStudentGPA, getStudentPercentil, getMarksByGroupId};