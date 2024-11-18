const dbPool = require("../config/db");

const getInstitutes = async () => {
    const query = `SELECT *
                   FROM institutes`;
    const {rows} = await dbPool.query(query);
    return rows;
};

const addInstitute = async (name, branch_id) => {
    const query = `INSERT INTO institutes (name, branch_id)
                   VALUES ($1, $2)
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [name, branch_id]);
    return rows;
};

const updateInstitute = async (id, name, branch_id) => {
    const query = `UPDATE institutes
                   SET name      = coalesce($1, name),
                       branch_id = coalesce($2, branch_id)
                   WHERE id = $3
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [name, branch_id, id]);
    return rows.length === 0 ? null : rows;
};

const deleteInstitute = async (id) => {
    const query = `DELETE
                   FROM institutes
                   WHERE id = $1
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [id]);
    return rows.length === 0 ? null : rows;
};

module.exports = {getInstitutes, addInstitute, updateInstitute, deleteInstitute};