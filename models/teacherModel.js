const dbPool = require("../config/db");
const bcrypt = require('bcryptjs');

const getTeachers = async () => {
    const query = `
        SELECT name,
               secondname,
               lastname,
               role_id,
               department_id,
               code,
               phone,
               mail
        FROM teachers;
    `;
    const {rows} = await dbPool.query(query);
    return rows;
};

const addTeachers = async (teachers) => {
    const results = [];
    for (const teacher of teachers) {
        const {name, secondname, lastname, role_id, department_id, code, phone, mail, password} = teacher;

        if (!name || !lastname || !role_id || !department_id || !code || !phone || !mail || !password) {
            throw new Error("All fields are required for each teacher");
        }

        const result = await dbPool.query(`
            INSERT INTO teachers (name, secondname, lastname, role_id, department_id, code, phone, mail, password)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `, [name, secondname, lastname, role_id, department_id, code, phone, mail, await bcrypt.hash(password, 10)]);

        if (!result.rows) {
            throw new Error('Failed to insert teacher');
        }
        results.push(result.rows);
    }
    return results;
};

const updateTeacher = async (id, name, secondname, lastname, role_id, department_id, code, phone, mail, password) => {
    const query = `
        UPDATE teachers
        SET name          = COALESCE($1, name),
            secondname    = COALESCE($2, secondname),
            lastname      = COALESCE($3, lastname),
            role_id       = COALESCE($4, role_id),
            department_id = COALESCE($5, department_id),
            code          = COALESCE($6, code),
            phone         = COALESCE($7, phone),
            mail          = COALESCE($8, mail),
            password      = COALESCE($9, password)
        WHERE id = $10
        RETURNING *;
    `;
    const {rows} = await dbPool.query(query, [name, secondname, lastname, role_id, department_id, code, phone, mail, await bcrypt.hash(password, 10), id]);
    return rows.length === 0 ? null : rows;
};

const deleteTeacher = async (id) => {
    const query = `DELETE
                   FROM teachers
                   WHERE id = $1
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [id]);
    return rows.length === 0 ? null : rows;
};

module.exports = {getTeachers, addTeachers, updateTeacher, deleteTeacher};