const dbPool = require("../config/db");

const getAuditoryAccessesTeachersId = async (id) => {
    const query = `SELECT *
                   FROM accesscontrol_teacher
                   WHERE teacher_id = $1`;
    const {rows} = await dbPool.query(query, [id]);
    return rows;
};

const getAuditoryAccessesAdminsId = async (id) => {
    const query = `SELECT *
                   FROM accesscontrol_admin
                   WHERE admin_id = $1`;
    const {rows} = await dbPool.query(query, [id]);
    return rows;
};

const getAuditoryAccessesStaffId = async (id) => {
    const query = `SELECT *
                   FROM accesscontrol_staff
                   WHERE staff_id = $1`;
    const {rows} = await dbPool.query(query, [id]);
    return rows;
};

const getAuditoryIdAccessesTeachers = async (id) => {
    const query = `SELECT *
                   FROM accesscontrol_teacher
                   WHERE auditory_id = $1`;
    const {rows} = await dbPool.query(query, [id]);
    return rows;
};

const getAuditoryIdAccessesAdmins = async (id) => {
    const query = `SELECT *
                   FROM accesscontrol_admin
                   WHERE auditory_id = $1`;
    const {rows} = await dbPool.query(query, [id]);
    return rows;
};

const getAuditoryIdAccessesStaff = async (id) => {
    const query = `SELECT *
                   FROM accesscontrol_staff
                   WHERE auditory_id = $1`;
    const {rows} = await dbPool.query(query, [id]);
    return rows;
};

module.exports = {
    getAuditoryAccessesTeachersId,
    getAuditoryAccessesAdminsId,
    getAuditoryAccessesStaffId,
    getAuditoryIdAccessesTeachers,
    getAuditoryIdAccessesAdmins,
    getAuditoryIdAccessesStaff
};