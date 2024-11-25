const adminModel = require('../models/adminModel');

const getAdmins = async (req, res) => {
    // #swagger.tags = ['Admins']
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
        const admins = await adminModel.getAdmins();
        res.status(200).json(admins);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getAdminById = async (req, res) => {
    // #swagger.tags = ['Admins']
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
        const admin = await adminModel.getAdminById(id);
        res.status(200).json(admin);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const addAdmins = async (req, res) => {
    // #swagger.tags = ['Admins']
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
                      mail: { type: "string" }
                    },
                    required: ["name", "lastname", "role_id", "phone", "mail"]
                  }
                }
              }
            }
          } */
    const admins = req.body;

    if (!admins || !Array.isArray(admins)) {
        return res.status(400).json({message: "Admins list is required and must be an array"});
    }

    try {
        const results = await adminModel.addAdmins(admins);
        res.status(201).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const updateAdmins = async (req, res) => {
    // #swagger.tags = ['Admins']
    // #swagger.description = 'all admins only'
    const {id} = req.params;
    const {name, secondname, lastname, role_id, phone, mail} = req.body;

    try {
        const admin = await adminModel.updateAdmin(id, {
            name,
            secondname,
            lastname,
            role_id,
            phone,
            mail
        });
        if (admin.length === 0) return res.status(404).json({message: "Admin not found"});
        res.status(200).json(admin);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const deleteAdmins = async (req, res) => {
    // #swagger.tags = ['Admins']
    // #swagger.description = 'all admins only'
    const {id} = req.params;

    try {
        const admin = await adminModel.deleteAdmin(id);
        if (admin.length === 0) return res.status(404).json({message: "Admin not found"});
        res.status(200).json({message: "Admin deleted", admin: admin});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getAdmins, getAdminById, addAdmins, updateAdmins, deleteAdmins};