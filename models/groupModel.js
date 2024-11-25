const dbPool = require("../config/db");

const getGroups = async () => {
    const query = `SELECT *
                   FROM groups`;
    const {rows} = await dbPool.query(query);
    return rows;
};

const getGroupById = async (id) => {
    const query = `SELECT *
                   FROM groups
                   WHERE id = $1`;
    const {rows} = await dbPool.query(query, [id]);
    return rows[0];
};

const addGroup = async (group_code, institute_id) => {
    const query = `INSERT INTO groups (group_code, institute_id)
                   VALUES ($1, $2)
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [group_code, institute_id]);
    return rows;
};

const updateGroup = async (id, group_code, institute_id) => {
    const query = `UPDATE groups
                   SET group_code   = coalesce($1, group_code),
                       institute_id = coalesce($2, institute_id)
                   WHERE id = $3
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [group_code, institute_id, id]);
    return rows.length === 0 ? null : rows;
};

const deleteGroup = async (id) => {
    const query = `DELETE
                   FROM groups
                   WHERE id = $1
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [id]);
    return rows.length === 0 ? null : rows;
};

module.exports = {getGroups, getGroupById, addGroup, updateGroup, deleteGroup};