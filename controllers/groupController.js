const groupsModel = require('../models/groupModel');

const getGroups = async (req, res) => {
    // #swagger.tags = ['Groups']
    try {
        const groups = await groupsModel.getGroups();
        res.status(200).json(groups);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const addGroups = async (req, res) => {
    // #swagger.tags = ['Groups']
    const {group_code, institute_id} = req.body;

    if (!group_code) return res.status(400).json({message: "Group code is required"});

    try {
        const newGroup = await groupsModel.addGroup(group_code, institute_id);
        res.status(201).json(newGroup);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const updateGroups = async (req, res) => {
    // #swagger.tags = ['Groups']
    const {id} = req.params;
    const {group_code, institute_id} = req.body;

    if (!group_code) return res.status(400).json({message: "Group code is required"});

    try {
        const updatedGroup = await groupsModel.updateGroup(id, group_code, institute_id);
        res.status(200).json(updatedGroup);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const deleteGroups = async (req, res) => {
    // #swagger.tags = ['Groups']
    const {id} = req.params;

    try {
        const result = await groupsModel.deleteGroup(id);
        if (!result) return res.status(404).json({message: "Group not found"});
        res.status(200).json({message: "Group deleted", group: result});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getGroups, addGroups, updateGroups, deleteGroups};