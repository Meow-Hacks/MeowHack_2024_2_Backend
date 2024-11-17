const dbPool = require("../config/db");
const bcrypt = require('bcryptjs');


const getStudents = async (req, res) => {
    // #swagger.tags = ['Students']
    try {
        const query = `
            SELECT *
            FROM students;
        `;
        const {rows} = await dbPool.query(query);
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
}

const addStudents = async (req, res) => {
    // #swagger.tags = ['Students']
    const students = req.body;

    if (!students || !Array.isArray(students)) {
        return res.status(400).json({message: "Students list is required and must be an array"});
    }

    try {
        const query = `
            INSERT INTO students (name, secondname, lastname, role_id, group_id, institute_id, code, phone, mail,
                                  password)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *;
        `;

        const results = [];
        for (const student of students) {
            const {name, secondname, lastname, role_id, group_id, institute_id, code, phone, mail, password} = student;

            if (!name || !lastname || !role_id || !group_id || !institute_id || !code || !phone || !mail || !password) {
                return res.status(400).json({message: "All fields are required for each student"});
            }

            const result = await dbPool.query(query, [
                name,
                secondname,
                lastname,
                role_id,
                group_id,
                institute_id,
                code,
                phone,
                mail,
                await bcrypt.hash(password, 10)
            ]);

            if (!result.rows) {
                throw new Error('Failed to insert student');
            }
            results.push(result.rows);
        }
        res.status(201).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const updateStudents = async (req, res) => {
    // #swagger.tags = ['Students']
    const {id} = req.params;
    const {name, secondname, lastname, role_id, group_id, institute_id, code, phone, mail, password} = req.body;

    try {
        const query = `
            UPDATE students
            SET name         = COALESCE($1, name),
                secondname   = COALESCE($2, secondname),
                lastname     = COALESCE($3, lastname),
                role_id      = COALESCE($4, role_id),
                group_id     = coalesce($5, group_id),
                institute_id = coalesce($6, institute_id),
                code         = COALESCE($7, code),
                phone        = COALESCE($8, phone),
                mail         = COALESCE($9, mail),
                password     = COALESCE($10, password)
            WHERE id = $11
            RETURNING *;
        `;
        const {rows} = await dbPool.query(query, [name, secondname, lastname, role_id, group_id, institute_id, code, phone, mail, await bcrypt.hash(password, 10), id]);
        if (rows.length === 0) return res.status(404).json({message: "Student not found"});
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
}

const deleteStudent = async (req, res) => {
    // #swagger.tags = ['Student']
    const {id} = req.params;

    try {
        const query = `DELETE
                       FROM students
                       WHERE id = $1
                       RETURNING *`;
        const {rows} = await dbPool.query(query, [id]);
        if (rows.length === 0) return res.status(404).json({message: "Student not found"});
        res.json({message: "Student deleted", branch: rows[0]});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getStudents, addStudents, updateStudents, deleteStudent};