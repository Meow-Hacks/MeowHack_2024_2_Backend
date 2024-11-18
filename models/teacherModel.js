const dbPool = require("../config/db");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

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
        const {name, secondname, lastname, role_id, department_id, code, phone, mail, password} = teacher;
        const enter_token = jwt.sign({
            name: teacher.name,
            secondname: teacher.secondname,
            lastname: teacher.lastname,
            role_id: teacher.role_id,
            department_id: teacher.department_id,
            code: teacher.code,
            phone: teacher.phone,
            mail: teacher.mail
        }, process.env.SECRET_KEY, {expiresIn: '365d'});

        if (!name || !lastname || !role_id || !department_id || !code || !phone || !mail || !password) {
            throw new Error("All fields are required for each teacher");
        }

        const result = await dbPool.query(`
            INSERT INTO teachers (name, secondname, lastname, role_id, department_id, code, phone, mail, password,
                                  enter_token)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *;
        `, [name, secondname, lastname, role_id, department_id, code, phone, mail, await bcrypt.hash(password, 10), enter_token]);

        if (!result.rows) {
            throw new Error('Failed to insert teacher');
        }
        results.push(result.rows);
    }
    return results;
};

const updateTeacher = async (id, teacher) => {
    const {name, secondname, lastname, role_id, department_id, code, phone, mail, password} = teacher;
    const enter_token = jwt.sign({
        name: teacher.name,
        secondname: teacher.secondname,
        lastname: teacher.lastname,
        role_id: teacher.role_id,
        department_id: teacher.department_id,
        code: teacher.code,
        phone: teacher.phone,
        mail: teacher.mail
    }, process.env.SECRET_KEY, {expiresIn: '365d'});

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
            password      = COALESCE($9, password),
            enter_token   = coalesce($10, enter_token)
        WHERE id = $11
        RETURNING *;
    `;
    const {rows} = await dbPool.query(query, [name, secondname, lastname, role_id, department_id, code, phone, mail, await bcrypt.hash(password, 10), enter_token, id]);
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