const dbPool = require("../config/db");
const bcrypt = require('bcryptjs');

const getStudents = async () => {
    const query = `SELECT name,
                          secondname,
                          lastname,
                          role_id,
                          group_id,
                          institute_id,
                          code,
                          phone,
                          mail
                   FROM students`;
    const {rows} = await dbPool.query(query);
    return rows;
};

const addStudents = async (students) => {
    const results = [];
    for (const student of students) {
        const {name, secondname, lastname, role_id, group_id, institute_id, code, phone, mail, password} = student;

        if (!name || !lastname || !role_id || !group_id || !institute_id || !code || !phone || !mail || !password) {
            throw new Error("All fields are required for each student");
        }

        const result = await dbPool.query(`
            INSERT INTO students (name, secondname, lastname, role_id, group_id, institute_id, code, phone, mail,
                                  password)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *;
        `, [name, secondname, lastname, role_id, group_id, institute_id, code, phone, mail, await bcrypt.hash(password, 10)]);

        if (!result.rows) {
            throw new Error('Failed to insert student');
        }
        results.push(result.rows);
    }
    return results;
};

const updateStudent = async (id, name, secondname, lastname, role_id, group_id, institute_id, code, phone, mail, password) => {
    const query = `
        UPDATE students
        SET name         = COALESCE($1, name),
            secondname   = COALESCE($2, secondname),
            lastname     = COALESCE($3, lastname),
            role_id      = COALESCE($4, role_id),
            group_id     = COALESCE($5, group_id),
            institute_id = COALESCE($6, institute_id),
            code         = COALESCE($7, code),
            phone        = COALESCE($8, phone),
            mail         = COALESCE($9, mail),
            password     = COALESCE($10, password)
        WHERE id = $11
        RETURNING *;
    `;
    const {rows} = await dbPool.query(query, [name, secondname, lastname, role_id, group_id, institute_id, code, phone, mail, await bcrypt.hash(password, 10), id]);
    return rows.length === 0 ? null : rows;
};

const deleteStudent = async (id) => {
    const query = `DELETE
                   FROM students
                   WHERE id = $1
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [id]);
    return rows.length === 0 ? null : rows;
};

module.exports = {getStudents, addStudents, updateStudent, deleteStudent};