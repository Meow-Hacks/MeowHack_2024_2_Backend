const teachersModel = require('../models/teacherModel');

const getTeachers = async (req, res) => {
    // #swagger.tags = ['Teachers']
    // #swagger.description = 'lessons or all admins only'
    /* #swagger.responses[200] = {
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
                  department_id: { type: "integer" },
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
        const teachers = await teachersModel.getTeachers();
        res.status(200).json(teachers);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const addTeachers = async (req, res) => {
    // #swagger.tags = ['Teachers']
    // #swagger.description = 'lessons or all admins only'
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
                      department_id: { type: "integer" },
                      phone: { type: "string" },
                      mail: { type: "string" }
                    },
                    required: ["name", "lastname", "role_id", "department_id", "phone", "mail"]
                  }
                }
              }
            }
          } */
    const teachers = req.body;

    if (!teachers || !Array.isArray(teachers)) {
        return res.status(400).json({message: "Teachers list is required and must be an array"});
    }

    try {
        const newTeachers = await teachersModel.addTeachers(teachers);
        res.status(201).json(newTeachers);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const updateTeachers = async (req, res) => {
    // #swagger.tags = ['Teachers']
    // #swagger.description = 'lessons or all admins only'
    const {id} = req.params;
    const {name, secondname, lastname, role_id, department_id, phone, mail} = req.body;

    try {
        const updatedTeacher = await teachersModel.updateTeacher(id, name, secondname, lastname, role_id, department_id, phone, mail);
        res.status(200).json(updatedTeacher);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const deleteTeachers = async (req, res) => {
    // #swagger.tags = ['Teachers']
    // #swagger.description = 'lessons or all admins only'
    const {id} = req.params;

    try {
        const result = await teachersModel.deleteTeacher(id);
        if (!result) return res.status(404).json({message: "Teacher not found"});
        res.status(200).json({message: "Teacher deleted", teacher: result});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getTeachers, addTeachers, updateTeachers, deleteTeachers};