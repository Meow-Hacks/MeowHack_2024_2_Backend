const dbPool = require("../config/db");

const getSubjects = async () => {
    const query = `SELECT *
                   FROM subjects`;
    const {rows} = await dbPool.query(query);
    return rows;
};

const addSubject = async (name, default_auditory_id, duration) => {
    const query = `INSERT INTO subjects (name, default_auditory_id, duration)
                   VALUES ($1, $2, $3)
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [name, default_auditory_id, duration]);
    return rows;
};

const updateSubject = async (id, name, default_auditory_id, duration) => {
    const query = `UPDATE subjects
                   SET name                = coalesce($1, name),
                       default_auditory_id = coalesce($2, default_auditory_id),
                       duration            = coalesce($3, duration)
                   WHERE id = $4
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [name, default_auditory_id, duration, id]);
    return rows;
};

const deleteSubject = async (id) => {
    const query = `DELETE
                   FROM subjects
                   WHERE id = $1
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [id]);
    return rows;
};

module.exports = {getSubjects, addSubject, updateSubject, deleteSubject};