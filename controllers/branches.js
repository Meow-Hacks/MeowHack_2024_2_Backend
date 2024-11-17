const dbPool = require("../config/db");

const getBranch = async (req, res) => {
    // #swagger.tags = ['Branches']
    try {
        const query = `SELECT *
                       FROM branches`;
        const {rows} = await dbPool.query(query);
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"})
    }
}

const addBranch = async (req, res) => {
    // #swagger.tags = ['Branches']
    const {name, address} = req.body;

    if (!name) return res.status(400).json({message: "Name is required"});

    try {
        const query = `INSERT INTO branches (name, address)
                       VALUES ($1, $2)
                       RETURNING *`;
        const {rows} = await dbPool.query(query, [name, address]);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const updateBranch = async (req, res) => {
    // #swagger.tags = ['Branches']
    const {id} = req.params;
    const {name, address} = req.body;

    if (!name) return res.status(400).json({message: "Name is required"});

    try {
        const query = `UPDATE branches
                       SET name    = coalesce($1, name),
                           address = coalesce($2, address)
                       WHERE id = $3
                       RETURNING *`;
        const {rows} = await dbPool.query(query, [name, address, id]);
        if (rows.length === 0) return res.status(404).json({message: "Branch not found"});
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const deleteBranch = async (req, res) => {
    // #swagger.tags = ['Branches']
    const {id} = req.params;

    try {
        const query = `DELETE
                       FROM branches
                       WHERE id = $1
                       RETURNING *`;
        const {rows} = await dbPool.query(query, [id]);
        if (rows.length === 0) return res.status(404).json({message: "Branch not found"});
        res.json({message: "Branch deleted", branch: rows[0]});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getBranch, addBranch, updateBranch, deleteBranch};