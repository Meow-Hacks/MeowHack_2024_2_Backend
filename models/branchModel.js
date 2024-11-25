const dbPool = require("../config/db");

const getBranches = async () => {
    const query = `SELECT *
                   FROM branches`;
    const {rows} = await dbPool.query(query);
    return rows;
};

const getBranchById = async (id) => {
    const query = `SELECT *
                   FROM branches
                   WHERE id = $1;`;
    const {rows} = await dbPool.query(query, [id]);
    return rows[0];
};

const addBranch = async (name, address) => {
    const query = `INSERT INTO branches (name, address)
                   VALUES ($1, $2)
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [name, address]);
    return rows;
};

const updateBranch = async (id, name, address) => {
    const query = `UPDATE branches
                   SET name    = coalesce($1, name),
                       address = coalesce($2, address)
                   WHERE id = $3
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [name, address, id]);
    return rows;
};

const deleteBranch = async (id) => {
    const query = `DELETE
                   FROM branches
                   WHERE id = $1
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [id]);
    return rows;
};

module.exports = {getBranches, getBranchById, addBranch, updateBranch, deleteBranch};