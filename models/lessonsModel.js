const dbPool = require("../config/db");

const getLessons = async () => {
    const query = `SELECT *
                   FROM lessons;`;
    const {rows} = await dbPool.query(query);
    return rows;
};

const addLessons = async (lessons) => {
    const results = [];
    for (const lesson of lessons) {
        const {subject_id, group_id, auditory_id, teacher_id, start_time, end_time, type_of_lesson} = lesson;

        const query = `
            INSERT INTO lessons (subject_id, group_id, auditory_id, teacher_id, start_time, end_time, type_of_lesson)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;
        const result = await dbPool.query(query, [subject_id, group_id, auditory_id, teacher_id, start_time, end_time, type_of_lesson]);
        results.push(result.rows);
    }
    return results;
};

const updateLesson = async (id, lesson) => {
    const {subject_id, group_id, auditory_id, teacher_id, start_time, end_time, type_of_lesson} = lesson;

    const query = `
        UPDATE lessons
        SET subject_id     = COALESCE($1, subject_id),
            group_id       = COALESCE($2, group_id),
            auditory_id    = COALESCE($3, auditory_id),
            teacher_id     = COALESCE($4, teacher_id),
            start_time     = COALESCE($5, start_time),
            end_time       = COALESCE($6, end_time),
            type_of_lesson = coalesce($7, type_of_lesson)
        WHERE id = $8
        RETURNING *;
    `;
    const {rows} = await dbPool.query(query, [subject_id, group_id, auditory_id, teacher_id, start_time, end_time, type_of_lesson, id]);
    return rows;
};

const deleteLesson = async (id) => {
    const query = `DELETE
                   FROM lessons
                   WHERE id = $1
                   RETURNING *;`;
    const {rows} = await dbPool.query(query, [id]);
    return rows;
};

module.exports = {getLessons, addLessons, updateLesson, deleteLesson};