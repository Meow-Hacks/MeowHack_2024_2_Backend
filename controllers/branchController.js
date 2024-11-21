const branchesModel = require('../models/branchModel');

const getBranch = async (req, res) => {
    // #swagger.tags = ['Branches']
    try {
        const branches = await branchesModel.getBranches();
        res.status(200).json(branches);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const addBranch = async (req, res) => {
    // #swagger.tags = ['Branches']
    const {name, address} = req.body;

    if (!name) return res.status(400).json({message: "Name is required"});

    try {
        const newBranch = await branchesModel.addBranch(name, address);
        res.status(201).json(newBranch);
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
        const updatedBranch = await branchesModel.updateBranch(id, name, address);
        res.status(200).json(updatedBranch);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const deleteBranch = async (req, res) => {
    // #swagger.tags = ['Branches']
    const {id} = req.params;

    try {
        const result = await branchesModel.deleteBranch(id);
        if (!result) return res.status(404).json({message: "Branch not found"});
        res.status(200).json({message: "Branch deleted", branch: result});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getBranch, addBranch, updateBranch, deleteBranch};