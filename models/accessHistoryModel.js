const dbPool = require("../config/db");

const getAuditoryAccessesHistoryTeachersId = async (id) => {
    const query = `SELECT *
                   FROM accesshistory_teacher
                   WHERE teacher_id = $1`;
    const {rows} = await dbPool.query(query, [id]);
    return rows;
};

const getAuditoryAccessesHistoryAdminsId = async (id) => {
    const query = `SELECT *
                   FROM accesshistory_admin
                   WHERE admin_id = $1`;
    const {rows} = await dbPool.query(query, [id]);
    return rows;
};

const getAuditoryAccessesHistoryStaffId = async (id) => {
    const query = `SELECT *
                   FROM accesshistory_staff
                   WHERE staff_id = $1`;
    const {rows} = await dbPool.query(query, [id]);
    return rows;
};

const getAuditoryIdAccessesHistoryTeachers = async (id) => {
    const query = `SELECT *
                   FROM accesshistory_teacher
                   WHERE auditory_id = $1`;
    const {rows} = await dbPool.query(query, [id]);
    return rows;
};

const getAuditoryIdAccessesHistoryAdmins = async (id) => {
    const query = `SELECT *
                   FROM accesshistory_admin
                   WHERE auditory_id = $1`;
    const {rows} = await dbPool.query(query, [id]);
    return rows;
};

const getAuditoryIdAccessesHistoryStaff = async (id) => {
    const query = `SELECT *
                   FROM accesshistory_staff
                   WHERE auditory_id = $1`;
    const {rows} = await dbPool.query(query, [id]);
    return rows;
};

module.exports = {
    getAuditoryAccessesHistoryTeachersId,
    getAuditoryAccessesHistoryAdminsId,
    getAuditoryAccessesHistoryStaffId,
    getAuditoryIdAccessesHistoryTeachers,
    getAuditoryIdAccessesHistoryAdmins,
    getAuditoryIdAccessesHistoryStaff
};