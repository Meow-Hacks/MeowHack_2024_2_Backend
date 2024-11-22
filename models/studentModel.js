const dbPool = require("../config/db");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const generator = require("generate-password");
const mailer = require("../middleware/mailer");

const getStudents = async () => {
    const query = `SELECT name,
                          secondname,
                          lastname,
                          role_id,
                          group_id,
                          institute_id,
                          code,
                          phone,
                          mail,
                          enter_token
                   FROM students`;
    const {rows} = await dbPool.query(query);
    return rows;
};

const addStudents = async (students) => {
    const results = [];
    for (const student of students) {
        const {name, secondname, lastname, role_id, group_id, institute_id, phone, mail} = student;

        if (!name || !lastname || !role_id || !group_id || !institute_id || !phone || !mail) {
            throw new Error("All fields are required for each student");
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
            INSERT INTO students (name, secondname, lastname, role_id, group_id, institute_id, phone, mail,
                                  password)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `, [name, secondname, lastname, role_id, group_id, institute_id, phone, mail, await bcrypt.hash(password, 10)]);

        if (!result.rows) {
            throw new Error('Failed to insert student');
        }
        results.push(result.rows);
    }
    return results;
};

const updateStudent = async (id, student) => {
    const {name, secondname, lastname, role_id, group_id, institute_id, phone, mail} = student;

    const query = `
        UPDATE students
        SET name         = COALESCE($1, name),
            secondname   = COALESCE($2, secondname),
            lastname     = COALESCE($3, lastname),
            role_id      = COALESCE($4, role_id),
            group_id     = COALESCE($5, group_id),
            institute_id = COALESCE($6, institute_id),
            phone        = COALESCE($7, phone),
            mail         = COALESCE($8, mail)
        WHERE id = $9
        RETURNING *;
    `;
    const {rows} = await dbPool.query(query, [name, secondname, lastname, role_id, group_id, institute_id, phone, mail, id]);
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