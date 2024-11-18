const dbPool = require("../config/db");

const getAuditories = async () => {
    const query = `SELECT * FROM auditories`;
    const { rows } = await dbPool.query(query);
    return rows;
};

const addAuditory = async (name, capacity, branch_id) => {
    const query = `INSERT INTO auditories (name, capacity, branch_id)
                   VALUES ($1, $2, $3)
                   RETURNING *`;
    const { rows } = await dbPool.query(query, [name, capacity, branch_id]);
    return rows;
};

const updateAuditory = async (id, name, capacity, branch_id) => {
    const query = `UPDATE auditories
                   SET name      = coalesce($1, name),
                       capacity  = coalesce($2, capacity),
                       branch_id = coalesce($3, branch_id)
                   WHERE id = $4
                   RETURNING *`;
    const { rows } = await dbPool.query(query, [name, capacity, branch_id, id]);
    return rows;
};

const deleteAuditory = async (id) => {
    const query = `DELETE
                   FROM auditories
                   WHERE id = $1
                   RETURNING *`;
    const { rows } = await dbPool.query(query, [id]);
    return rows;
};

module.exports = { getAuditories, addAuditory, updateAuditory, deleteAuditory };