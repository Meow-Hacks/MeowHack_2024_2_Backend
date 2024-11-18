const dbPool = require("../config/db");
const bcrypt = require('bcryptjs');


const getStaff = async (req, res) => {
    // #swagger.tags = ['Staff']
    try {
        const query = `
            SELECT *
            FROM staff;
        `;
        const {rows} = await dbPool.query(query);
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
}

const addStaff = async (req, res) => {
    // #swagger.tags = ['Staff']
    const staffs = req.body;

    if (!staffs || !Array.isArray(staffs)) {
        return res.status(400).json({message: "Staff list is required and must be an array"});
    }

    try {
        const query = `
            INSERT INTO staff (name, secondname, lastname, role_id, code, phone, mail)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;

        const results = [];
        for (const staff of staffs) {
            const {name, secondname, lastname, role_id, code, phone, mail} = staff;

            if (!name || !lastname || !role_id || !code || !phone || !mail) {
                return res.status(400).json({message: "All fields are required for each admin"});
            }

            const result = await dbPool.query(query, [
                name,
                secondname,
                lastname,
                role_id,
                code,
                phone,
                mail
            ]);

            if (!result.rows) {
                throw new Error('Failed to insert staff');
            }
            results.push(result.rows);
        }
        res.status(201).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const updateStaff = async (req, res) => {
    // #swagger.tags = ['Staff']
    const {id} = req.params;
    const {name, secondname, lastname, role_id, code, phone, mail} = req.body;

    try {
        const query = `
            UPDATE staff
            SET name       = COALESCE($1, name),
                secondname = COALESCE($2, secondname),
                lastname   = COALESCE($3, lastname),
                role_id    = COALESCE($4, role_id),
                code       = COALESCE($5, code),
                phone      = COALESCE($6, phone),
                mail       = COALESCE($7, mail)
            WHERE id = $8
            RETURNING *;
        `;
        const {rows} = await dbPool.query(query, [name, secondname, lastname, role_id, code, phone, mail, id]);
        if (rows.length === 0) return res.status(404).json({message: "Staff not found"});
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
}

const deleteStaff = async (req, res) => {
    // #swagger.tags = ['Staff']
    const {id} = req.params;

    try {
        const query = `DELETE
                       FROM staff
                       WHERE id = $1
                       RETURNING *`;
        const {rows} = await dbPool.query(query, [id]);
        if (rows.length === 0) return res.status(404).json({message: "Staff not found"});
        res.json({message: "Staff deleted", branch: rows[0]});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getStaff, addStaff, updateStaff, deleteStaff};