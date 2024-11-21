const studentsModel = require('../models/studentModel');

const getStudents = async (req, res) => {
    // #swagger.tags = ['Students']
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
                  group_id: { type: "integer" },
                  institute_id: { type: "integer" },
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
        const students = await studentsModel.getStudents();
        res.status(200).json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const addStudents = async (req, res) => {
    // #swagger.tags = ['Students']
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
                      group_id: { type: "integer" },
                      institute_id: { type: "integer" },
                      code: { type: "string" },
                      phone: { type: "string" },
                      mail: { type: "string" },
                      password: { type: "string" }
                    },
                    required: ["name", "lastname", "role_id", "code", "group_id", "institute_id", "phone", "mail", "password"]
                  }
                }
              }
            }
          } */
    const students = req.body;

    if (!students || !Array.isArray(students)) {
        return res.status(400).json({message: "Students list is required and must be an array"});
    }

    try {
        const newStudents = await studentsModel.addStudents(students);
        res.status(201).json(newStudents);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const updateStudents = async (req, res) => {
    // #swagger.tags = ['Students']
    const {id} = req.params;
    const {name, secondname, lastname, role_id, group_id, institute_id, code, phone, mail, password} = req.body;

    try {
        const updatedStudent = await studentsModel.updateStudent(id, name, secondname, lastname, role_id, group_id, institute_id, code, phone, mail, password);
        res.status(200).json(updatedStudent);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

const deleteStudent = async (req, res) => {
    // #swagger.tags = ['Students']
    const {id} = req.params;

    try {
        const result = await studentsModel.deleteStudent(id);
        if (!result) return res.status(404).json({message: "Student not found"});
        res.status(200).json({message: "Student deleted", student: result});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Database error"});
    }
};

module.exports = {getStudents, addStudents, updateStudents, deleteStudent};