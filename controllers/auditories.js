const dbPool = require("../config/db");

const getAuditories = async (req, res) => {
    // #swagger.tags = ['Auditories']
    try {
        const query = `SELECT *
                       FROM auditories`;
        const {rows} = await dbPool.query(query);
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"})
    }
}

const addAuditories = async (req, res) => {
    // #swagger.tags = ['Auditories']
    const {name, capacity, branch_id} = req.body;

    if (!name) return res.status(400).json({message: "Name is required"});

    try {
        const query = `INSERT INTO auditories (name, capacity, branch_id)
                       VALUES ($1, $2, $3)
                       RETURNING *`;
        const {rows} = await dbPool.query(query, [name, capacity, branch_id]);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const updateAuditories = async (req, res) => {
    // #swagger.tags = ['Auditories']
    const {id} = req.params;
    const {name, capacity, branch_id} = req.body;

    if (!name) return res.status(400).json({message: "Name is required"});

    try {
        const query = `UPDATE auditories
                       SET name      = coalesce($1, name),
                           capacity  = coalesce($2, capacity),
                           branch_id = coalesce($3, branch_id)
                       WHERE id = $4
                       RETURNING *`;
        const {rows} = await dbPool.query(query, [name, capacity, branch_id, id]);
        if (rows.length === 0) return res.status(404).json({message: "Auditory not found"});
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const deleteAuditories = async (req, res) => {
    // #swagger.tags = ['Auditories']
    const {id} = req.params;

    try {
        const query = `DELETE
                       FROM auditories
                       WHERE id = $1
                       RETURNING *`;
        const {rows} = await dbPool.query(query, [id]);
        if (rows.length === 0) return res.status(404).json({message: "Auditory not found"});
        res.json({message: "Auditory deleted", branch: rows[0]});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getAuditories, addAuditories, updateAuditories, deleteAuditories};