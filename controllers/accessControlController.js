const accessControlModel = require('../models/accessControlModel');

const getAuditoryAccessesTeachersId = async (req, res) => {
    // #swagger.tags = ['Access Control']
    // #swagger.description = 'get accesses by teacher id (rooms or all admins only)'
    const {id} = req.params;

    try {
        const access = await accessControlModel.getAuditoryAccessesTeachersId(id);
        res.status(200).json(access);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getAuditoryAccessesAdminsId = async (req, res) => {
    // #swagger.tags = ['Access Control']
    // #swagger.description = 'get accesses by admin id (rooms or all admins only)'
    const {id} = req.params;

    try {
        const access = await accessControlModel.getAuditoryAccessesAdminsId(id);
        res.status(200).json(access);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getAuditoryAccessesStaffId = async (req, res) => {
    // #swagger.tags = ['Access Control']
    // #swagger.description = 'get accesses by staff id (rooms or all admins only)'
    const {id} = req.params;

    try {
        const access = await accessControlModel.getAuditoryAccessesStaffId(id);
        res.status(200).json(access);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getAuditoryIdAccessesTeachers = async (req, res) => {
    // #swagger.tags = ['Access Control']
    // #swagger.description = 'get teachers with access by auditory id (rooms or all admins only)'
    const {id} = req.params;

    try {
        const access = await accessControlModel.getAuditoryIdAccessesTeachers(id);
        res.status(200).json(access);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getAuditoryIdAccessesAdmins = async (req, res) => {
    // #swagger.tags = ['Access Control']
    // #swagger.description = 'get admins with access by auditory id (rooms or all admins only)'
    const {id} = req.params;

    try {
        const access = await accessControlModel.getAuditoryIdAccessesAdmins(id);
        res.status(200).json(access);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const getAuditoryIdAccessesStaff = async (req, res) => {
    // #swagger.tags = ['Access Control']
    // #swagger.description = 'get staff with access by auditory id (rooms or all admins only)'
    const {id} = req.params;

    try {
        const access = await accessControlModel.getAuditoryIdAccessesStaff(id);
        res.status(200).json(access);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const grantAccessByTeacherId = async (req, res) => {
    // #swagger.tags = ['Access Control']
    // #swagger.description = 'grant access to auditory by teacher id (rooms or all admins only)'
    /* #swagger.requestBody = {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                    properties: {
                      teacher_id: { type: "integer" },
                      auditory_id: { type: "integer" },
                      access_start_time: { type: "string", format: "date-time" },
                      type: { type: "string" }
                    },
                    required: ["teacher_id", "auditory_id", "access_start_time", "type"]
                }
              }
            }
          } */
    const {access} = req.body;

    try {
        const result = await accessControlModel.grantAccessByTeacherId(access);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const updateTeacherAccessById = async (req, res) => {
    // #swagger.tags = ['Access Control']
    // #swagger.description = 'update access to auditory for teacher by id (rooms or all admins only)'
    /* #swagger.requestBody = {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                    properties: {
                      teacher_id: { type: "integer" },
                      auditory_id: { type: "integer" },
                      access_start_time: { type: "string", format: "date-time" },
                      type: { type: "string" }
                    }
                }
              }
            }
          } */
    const {id} = req.params;
    const {access} = req.body;

    try {
        const updatedAccess = await accessControlModel.updateTeacherAccessById(id, access);
        res.status(200).json(updatedAccess);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const deleteTeacherAccessById = async (req, res) => {
    // #swagger.tags = ['Access Control']
    // #swagger.description = 'rooms or all admins only'
    const {id} = req.params;

    try {
        const result = await accessControlModel.deleteTeacherAccessById(id);
        if (!result) return res.status(404).json({message: "Access not found"});
        res.status(200).json({message: "Access deleted", access: result});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const grantAccessByAdminId = async (req, res) => {
    // #swagger.tags = ['Access Control']
    // #swagger.description = 'grant access to auditory by admin id (rooms or all admins only)'
    /* #swagger.requestBody = {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                    properties: {
                      admin_id: { type: "integer" },
                      auditory_id: { type: "integer" },
                      access_start_time: { type: "string", format: "date-time" },
                      type: { type: "string" }
                    },
                    required: ["admin_id", "auditory_id", "access_start_time", "type"]
                }
              }
            }
          } */
    const {access} = req.body;

    try {
        const result = await accessControlModel.grantAccessByAdminId(access);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const updateAdminAccessById = async (req, res) => {
    // #swagger.tags = ['Access Control']
    // #swagger.description = 'update access to auditory for admin by id (rooms or all admins only)'
    /* #swagger.requestBody = {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                    properties: {
                      admin_id: { type: "integer" },
                      auditory_id: { type: "integer" },
                      access_start_time: { type: "string", format: "date-time" },
                      type: { type: "string" }
                    }
                }
              }
            }
          } */
    const {id} = req.params;
    const {access} = req.body;

    try {
        const updatedAccess = await accessControlModel.updateAdminAccessById(id, access);
        res.status(200).json(updatedAccess);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const deleteAdminAccessById = async (req, res) => {
    // #swagger.tags = ['Access Control']
    // #swagger.description = 'rooms or all admins only'
    const {id} = req.params;

    try {
        const result = await accessControlModel.deleteAdminAccessById(id);
        if (!result) return res.status(404).json({message: "Access not found"});
        res.status(200).json({message: "Access deleted", access: result});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const grantAccessByStaffId = async (req, res) => {
    // #swagger.tags = ['Access Control']
    // #swagger.description = 'grant access to auditory by staff id (rooms or all admins only)'
    /* #swagger.requestBody = {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                    properties: {
                      staff_id: { type: "integer" },
                      auditory_id: { type: "integer" },
                      access_start_time: { type: "string", format: "date-time" },
                      type: { type: "string" }
                    },
                    required: ["staff_id", "auditory_id", "access_start_time", "type"]
                }
              }
            }
          } */
    const {access} = req.body;

    try {
        const result = await accessControlModel.grantAccessByStaffId(access);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const updateStaffAccessById = async (req, res) => {
    // #swagger.tags = ['Access Control']
    // #swagger.description = 'update access to auditory for staff by id (rooms or all admins only)'
    /* #swagger.requestBody = {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                    properties: {
                      admin_id: { type: "integer" },
                      auditory_id: { type: "integer" },
                      access_start_time: { type: "string", format: "date-time" },
                      type: { type: "string" }
                    }
                }
              }
            }
          } */
    const {id} = req.params;
    const {access} = req.body;

    try {
        const updatedAccess = await accessControlModel.updateStaffAccessById(id, access);
        res.status(200).json(updatedAccess);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const deleteStaffAccessById = async (req, res) => {
    // #swagger.tags = ['Access Control']
    // #swagger.description = 'rooms or all admins only'
    const {id} = req.params;

    try {
        const result = await accessControlModel.deleteStaffAccessById(id);
        if (!result) return res.status(404).json({message: "Access not found"});
        res.status(200).json({message: "Access deleted", access: result});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {
    getAuditoryAccessesTeachersId,
    getAuditoryAccessesAdminsId,
    getAuditoryAccessesStaffId,
    getAuditoryIdAccessesTeachers,
    getAuditoryIdAccessesAdmins,
    getAuditoryIdAccessesStaff,
    grantAccessByTeacherId,
    grantAccessByAdminId,
    grantAccessByStaffId,
    updateTeacherAccessById,
    deleteTeacherAccessById,
    updateAdminAccessById,
    deleteAdminAccessById,
    updateStaffAccessById,
    deleteStaffAccessById
};