const dbPool = require("../config/db");

const getDepartments = async (req, res) => {
    // #swagger.tags = ['Departments']
    try {
        const query = `SELECT *
                       FROM department`;
        const {rows} = await dbPool.query(query);
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"})
    }
}

const addDepartments = async (req, res) => {
    // #swagger.tags = ['Departments']
    const {name, institute_id} = req.body;

    if (!name) return res.status(400).json({message: "Name is required"});

    try {
        const query = `INSERT INTO department (name, institute_id)
                       VALUES ($1, $2)
                       RETURNING *`;
        const {rows} = await dbPool.query(query, [name, institute_id]);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const updateDepartments = async (req, res) => {
    // #swagger.tags = ['Departments']
    const {id} = req.params;
    const {name, institute_id} = req.body;

    if (!name) return res.status(400).json({message: "Name is required"});

    try {
        const query = `UPDATE department
                       SET name         = coalesce($1, name),
                           institute_id = coalesce($2, institute_id)
                       WHERE id = $3
                       RETURNING *`;
        const {rows} = await dbPool.query(query, [name, institute_id, id]);
        if (rows.length === 0) return res.status(404).json({message: "Department not found"});
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const deleteDepartments = async (req, res) => {
    // #swagger.tags = ['Departments']
    const {id} = req.params;

    try {
        const query = `DELETE
                       FROM department
                       WHERE id = $1
                       RETURNING *`;
        const {rows} = await dbPool.query(query, [id]);
        if (rows.length === 0) return res.status(404).json({message: "Department not found"});
        res.json({message: "Department deleted", branch: rows[0]});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getDepartments, addDepartments, updateDepartments, deleteDepartments};