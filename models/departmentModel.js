const dbPool = require("../config/db");

const getDepartments = async () => {
    const query = `SELECT *
                   FROM department`;
    const {rows} = await dbPool.query(query);
    return rows;
};

const getDepartmentsById = async (id) => {
    const query = `SELECT *
                   FROM department
                   WHERE id = $1;`;
    const {rows} = await dbPool.query(query, [id]);
    return rows[0];
};

const addDepartment = async (name, institute_id) => {
    const query = `INSERT INTO department (name, institute_id)
                   VALUES ($1, $2)
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [name, institute_id]);
    return rows;
};

const updateDepartment = async (id, name, institute_id) => {
    const query = `UPDATE department
                   SET name         = coalesce($1, name),
                       institute_id = coalesce($2, institute_id)
                   WHERE id = $3
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [name, institute_id, id]);
    return rows;
};

const deleteDepartment = async (id) => {
    const query = `DELETE
                   FROM department
                   WHERE id = $1
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [id]);
    return rows;
};

module.exports = {getDepartments, getDepartmentsById, addDepartment, updateDepartment, deleteDepartment};