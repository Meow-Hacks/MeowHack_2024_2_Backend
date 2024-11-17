const dbPool = require("../config/db");
const bcrypt = require('bcryptjs');


const getTeachers = async (req, res) => {
    // #swagger.tags = ['Teachers']
    try {
        const query = `
            SELECT *
            FROM teachers;
        `;
        const {rows} = await dbPool.query(query);
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
}

const addTeachers = async (req, res) => {
    // #swagger.tags = ['Teachers']
    const teachers = req.body;

    if (!teachers || !Array.isArray(teachers)) {
        return res.status(400).json({message: "Teachers list is required and must be an array"});
    }

    try {
        const query = `
            INSERT INTO teachers (name, secondname, lastname, role_id, department_id, code, phone, mail,
                                  password)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `;

        const results = [];
        for (const teacher of teachers) {
            const {name, secondname, lastname, role_id, department_id, code, phone, mail, password} = teacher;

            if (!name || !lastname || !role_id || !department_id || !code || !phone || !mail || !password) {
                return res.status(400).json({message: "All fields are required for each teacher"});
            }

            const result = await dbPool.query(query, [
                name,
                secondname,
                lastname,
                role_id,
                department_id,
                code,
                phone,
                mail,
                await bcrypt.hash(password, 10)
            ]);

            if (!result.rows) {
                throw new Error('Failed to insert teacher');
            }
            results.push(result.rows);
        }
        res.status(201).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const updateTeachers = async (req, res) => {
    // #swagger.tags = ['Teachers']
    const {id} = req.params;
    const {name, secondname, lastname, role_id, department_id, code, phone, mail, password} = req.body;

    try {
        const query = `
            UPDATE teachers
            SET name          = COALESCE($1, name),
                secondname    = COALESCE($2, secondname),
                lastname      = COALESCE($3, lastname),
                role_id       = COALESCE($4, role_id),
                department_id = coalesce($5, department_id),
                code          = COALESCE($6, code),
                phone         = COALESCE($7, phone),
                mail          = COALESCE($8, mail),
                password      = COALESCE($9, password)
            WHERE id = $10
            RETURNING *;
        `;
        const {rows} = await dbPool.query(query, [name, secondname, lastname, role_id, department_id, code, phone, mail, await bcrypt.hash(password, 10), id]);
        if (rows.length === 0) return res.status(404).json({message: "Teacher not found"});
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
}

const deleteTeachers = async (req, res) => {
    // #swagger.tags = ['Teachers']
    const {id} = req.params;

    try {
        const query = `DELETE
                       FROM teachers
                       WHERE id = $1
                       RETURNING *`;
        const {rows} = await dbPool.query(query, [id]);
        if (rows.length === 0) return res.status(404).json({message: "Teacher not found"});
        res.json({message: "Teacher deleted", branch: rows[0]});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getTeachers, addTeachers, updateTeachers, deleteTeachers};