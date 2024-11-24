const departmentsModel = require('../models/departmentModel');

const getDepartments = async (req, res) => {
    // #swagger.tags = ['Departments']
    // #swagger.description = 'lessons or all admins only'
    try {
        const departments = await departmentsModel.getDepartments();
        res.status(200).json(departments);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const addDepartments = async (req, res) => {
    // #swagger.tags = ['Departments']
    // #swagger.description = 'lessons or all admins only'
    const {name, institute_id} = req.body;

    if (!name) return res.status(400).json({message: "Name is required"});

    try {
        const newDepartment = await departmentsModel.addDepartment(name, institute_id);
        res.status(201).json(newDepartment);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const updateDepartments = async (req, res) => {
    // #swagger.tags = ['Departments']
    // #swagger.description = 'lessons or all admins only'
    const {id} = req.params;
    const {name, institute_id} = req.body;

    if (!name) return res.status(400).json({message: "Name is required"});

    try {
        const updatedDepartment = await departmentsModel.updateDepartment(id, name, institute_id);
        res.status(200).json(updatedDepartment);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const deleteDepartments = async (req, res) => {
    // #swagger.tags = ['Departments']
    // #swagger.description = 'lessons or all admins only'
    const {id} = req.params;

    try {
        const result = await departmentsModel.deleteDepartment(id);
        if (!result) return res.status(404).json({message: "Department not found"});
        res.status(200).json({message: "Department deleted", department: result});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getDepartments, addDepartments, updateDepartments, deleteDepartments};