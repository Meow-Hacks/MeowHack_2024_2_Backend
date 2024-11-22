const dbPool = require("../config/db");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const generator = require("generate-password");
const mailer = require("../middleware/mailer");

const getTeachers = async () => {
    const query = `
        SELECT name,
               secondname,
               lastname,
               role_id,
               department_id,
               code,
               phone,
               mail,
               enter_token
        FROM teachers;
    `;
    const {rows} = await dbPool.query(query);
    return rows;
};

const addTeachers = async (teachers) => {
    const results = [];
    for (const teacher of teachers) {
        const {name, secondname, lastname, role_id, department_id, phone, mail} = teacher;

        if (!name || !lastname || !role_id || !department_id || !phone || !mail) {
            throw new Error("All fields are required for each teacher");
        }

        const password = generator.generate({
            length: 16,
            numbers: true,
            symbols: true,
            lowercase: true,
            uppercase: true
        });

        mailer.sendEmail(mail, 'Вам посылка от эльдорадо', password);

        const result = await dbPool.query(`
            INSERT INTO teachers (name, secondname, lastname, role_id, department_id, phone, mail, password)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `, [name, secondname, lastname, role_id, department_id, phone, mail, await bcrypt.hash(password, 10)]);

        if (!result.rows) {
            throw new Error('Failed to insert teacher');
        }
        results.push(result.rows);
    }
    return results;
};

const updateTeacher = async (id, teacher) => {
    const {name, secondname, lastname, role_id, department_id, phone, mail, password} = teacher;

    const query = `
        UPDATE teachers
        SET name          = COALESCE($1, name),
            secondname    = COALESCE($2, secondname),
            lastname      = COALESCE($3, lastname),
            role_id       = COALESCE($4, role_id),
            department_id = COALESCE($5, department_id),
            phone         = COALESCE($6, phone),
            mail          = COALESCE($7, mail)
        WHERE id = $8
        RETURNING *;
    `;
    const {rows} = await dbPool.query(query, [name, secondname, lastname, role_id, department_id, phone, mail, await bcrypt.hash(password, 10), id]);
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