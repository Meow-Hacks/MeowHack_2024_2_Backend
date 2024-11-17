const dbPool = require("../config/db");
const bcrypt = require('bcryptjs');


const getAdmins = async (req, res) => {
    // #swagger.tags = ['Admins']
    try {
        const query = `
            SELECT *
            FROM admins;
        `;
        const {rows} = await dbPool.query(query);
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
}

const addAdmins = async (req, res) => {
    // #swagger.tags = ['Admins']
    const admins = req.body;

    if (!admins || !Array.isArray(admins)) {
        return res.status(400).json({message: "Admins list is required and must be an array"});
    }

    try {
        const query = `
            INSERT INTO admins (name, secondname, lastname, role_id, code, phone, mail, password)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;

        const results = [];
        for (const admin of admins) {
            const {name, secondname, lastname, role_id, code, phone, mail, password} = admin;

            if (!name || !lastname || !role_id || !code || !phone || !mail || !password) {
                return res.status(400).json({message: "All fields are required for each admin"});
            }

            const result = await dbPool.query(query, [
                name,
                secondname,
                lastname,
                role_id,
                code,
                phone,
                mail,
                await bcrypt.hash(password, 10)
            ]);

            if (!result.rows) {
                throw new Error('Failed to insert admin');
            }
            results.push(result.rows);
        }
        res.status(201).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const updateAdmins = async (req, res) => {
    // #swagger.tags = ['Admins']
    const {id} = req.params;
    const {name, secondname, lastname, role_id, code, phone, mail, password} = req.body;

    try {
        const query = `
            UPDATE admins
            SET name       = COALESCE($1, name),
                secondname = COALESCE($2, secondname),
                lastname   = COALESCE($3, lastname),
                role_id    = COALESCE($4, role_id),
                code       = COALESCE($5, code),
                phone      = COALESCE($6, phone),
                mail       = COALESCE($7, mail),
                password   = COALESCE($8, password)
            WHERE id = $9
            RETURNING *;
        `;
        const {rows} = await dbPool.query(query, [name, secondname, lastname, role_id, code, phone, mail,  await bcrypt.hash(password, 10), id]);
        if (rows.length === 0) return res.status(404).json({message: "Admin not found"});
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
}

const deleteAdmins = async (req, res) => {
    // #swagger.tags = ['Admins']
    const {id} = req.params;

    try {
        const query = `DELETE
                       FROM admins
                       WHERE id = $1
                       RETURNING *`;
        const {rows} = await dbPool.query(query, [id]);
        if (rows.length === 0) return res.status(404).json({message: "Admin not found"});
        res.json({message: "Admin deleted", branch: rows[0]});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getAdmins, addAdmins, updateAdmins, deleteAdmins};