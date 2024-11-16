const dbPool = require("../config/db");

const getGroups = async (req, res) => {
    try {
        const query = `SELECT *
                       FROM groups`;
        const {rows} = await dbPool.query(query);
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"})
    }
}

const addGroups = async (req, res) => {
    const {group_code, institute_id} = req.body;

    if (!name) return res.status(400).json({message: "Group code is required"});

    try {
        const query = `INSERT INTO groups (group_code, institute_id)
                       VALUES ($1, $2)
                       RETURNING *`;
        const {rows} = await dbPool.query(query, [group_code, institute_id]);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const updateGroups = async (req, res) => {
    const {id} = req.params;
    const {group_code, institute_id} = req.body;

    if (!group_code) return res.status(400).json({message: "Group code is required"});

    try {
        const query = `UPDATE groups
                       SET group_code   = $1,
                           institute_id = $2
                       WHERE id = $3
                       RETURNING *`;
        const {rows} = await dbPool.query(query, [group_code, institute_id, id]);
        if (rows.length === 0) return res.status(404).json({message: "Group not found"});
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const deleteGroups = async (req, res) => {
    const {id} = req.params;

    try {
        const query = `DELETE
                       FROM groups
                       WHERE id = $1
                       RETURNING *`;
        const {rows} = await dbPool.query(query, [id]);
        if (rows.length === 0) return res.status(404).json({message: "Group not found"});
        res.json({message: "Group deleted", branch: rows[0]});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getGroups, addGroups, updateGroups, deleteGroups};