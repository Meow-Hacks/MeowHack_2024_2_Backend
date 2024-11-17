const dbPool = require("../config/db");

const getInstitutes = async (req, res) => {
    // #swagger.tags = ['Institutes']
    try {
        const query = `SELECT *
                       FROM institutes`;
        const {rows} = await dbPool.query(query);
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"})
    }
}

const addInstitutes = async (req, res) => {
    // #swagger.tags = ['Institutes']
    const {name, branch_id} = req.body;

    if (!name) return res.status(400).json({message: "Name is required"});

    try {
        const query = `INSERT INTO institutes (name, branch_id)
                       VALUES ($1, $2)
                       RETURNING *`;
        const {rows} = await dbPool.query(query, [name, branch_id]);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const updateInstitutes = async (req, res) => {
    // #swagger.tags = ['Institutes']
    const {id} = req.params;
    const {name, branch_id} = req.body;

    if (!name) return res.status(400).json({message: "Name is required"});

    try {
        const query = `UPDATE institutes
                       SET name      = coalesce($1, name),
                           branch_id = coalesce($2, branch_id)
                       WHERE id = $3
                       RETURNING *`;
        const {rows} = await dbPool.query(query, [name, branch_id, id]);
        if (rows.length === 0) return res.status(404).json({message: "Institute not found"});
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const deleteInstitutes = async (req, res) => {
    // #swagger.tags = ['Institutes']
    const {id} = req.params;

    try {
        const query = `DELETE
                       FROM institutes
                       WHERE id = $1
                       RETURNING *`;
        const {rows} = await dbPool.query(query, [id]);
        if (rows.length === 0) return res.status(404).json({message: "Institute not found"});
        res.json({message: "Institute deleted", branch: rows[0]});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getInstitutes, addInstitutes, updateInstitutes, deleteInstitutes};