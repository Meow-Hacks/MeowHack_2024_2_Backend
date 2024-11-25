const staffModel = require('../models/staffModel');

const getStaff = async (req, res) => {
    // #swagger.tags = ['Staff']
    // #swagger.description = 'all admins only'
    /* #swagger.responses[200] = {
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "integer" },
                  name: { type: "string" },
                  secondname: { type: "string" },
                  lastname: { type: "string" },
                  role_id: { type: "integer" },
                  code: { type: "string" },
                  phone: { type: "string" },
                  mail: { type: "string" },
                  enter_token: { type: "string" }
                }
              }
            }
          }
        }
      } */
    try {
        const staff = await staffModel.getStaff();
        res.status(200).json(staff);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getStaffById = async (req, res) => {
    // #swagger.tags = ['Staff']
    // #swagger.description = 'all admins only'
    /* #swagger.responses[200] = {
        content: {
          "application/json": {
            schema: {
              type: "object",
                properties: {
                  id: { type: "integer" },
                  name: { type: "string" },
                  secondname: { type: "string" },
                  lastname: { type: "string" },
                  role_id: { type: "integer" },
                  code: { type: "string" },
                  phone: { type: "string" },
                  mail: { type: "string" },
                  enter_token: { type: "string" }
                }
            }
          }
        }
      } */
    try {
        const {id} = req.params;
        const staff = await staffModel.getStaffById(id);
        res.status(200).json(staff);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const addStaff = async (req, res) => {
    // #swagger.tags = ['Staff']
    // #swagger.description = 'all admins only'
    /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  secondname: { type: "string" },
                  lastname: { type: "string" },
                  role_id: { type: "integer" },
                  phone: { type: "string" },
                  mail: { type: "string" },
                },
                required: ["name", "lastname", "role_id", "phone", "mail"]
              }
            }
          }
        }
      } */
    const staffs = req.body;

    if (!staffs || !Array.isArray(staffs)) {
        return res.status(400).json({message: "Staff list is required and must be an array"});
    }

    try {
        const results = await staffModel.addStaff(staffs);
        res.status(201).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const updateStaff = async (req, res) => {
    // #swagger.tags = ['Staff']
    // #swagger.description = 'all admins only'
    const {id} = req.params;
    const {name, secondname, lastname, role_id, phone, mail} = req.body;

    try {
        const staff = await staffModel.updateStaff(id, {name, secondname, lastname, role_id, phone, mail});
        if (!staff) return res.status(404).json({message: "Staff not found"});
        res.status(200).json(staff);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const deleteStaff = async (req, res) => {
    // #swagger.tags = ['Staff']
    // #swagger.description = 'all admins only'
    const {id} = req.params;

    try {
        const staff = await staffModel.deleteStaff(id);
        if (!staff) return res.status(404).json({message: "Staff not found"});
        res.status(200).json({message: "Staff deleted", staff});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getStaff, getStaffById, addStaff, updateStaff, deleteStaff};