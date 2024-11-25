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

const grantAccessByTeacherId = async (access) => {
    const {teacher_id, auditory_id, access_start_time, type} = access;
    const query = `INSERT INTO accesscontrol_teacher (teacher_id, auditory_id, access_start_time, type)
                   VALUES ($1, $2, $3, $4)
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [teacher_id, auditory_id, access_start_time, type]);
    return rows[0];
};

const updateTeacherAccessById = async (id, access) => {
    const {teacher_id, auditory_id, access_start_time, type} = access;
    const query = `UPDATE accesscontrol_teacher
                   SET teacher_id        = coalesce($1, teacher_id),
                       auditory_id       = coalesce($2, auditory_id),
                       access_start_time = coalesce($3, access_start_time),
                       type              = coalesce($4, type)
                   WHERE id = $5
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [teacher_id, auditory_id, access_start_time, type, id]);
    return rows[0];
};

const deleteTeacherAccessById = async (id) => {
    const query = `DELETE
                   FROM accesscontrol_teacher
                   WHERE id = $1
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [id]);
    return rows[0];
};

const grantAccessByAdminId = async (access) => {
    const {admin_id, auditory_id, access_start_time, type} = access;
    const query = `INSERT INTO accesscontrol_admin (admin_id, auditory_id, access_start_time, type)
                   VALUES ($1, $2, $3, $4)
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [admin_id, auditory_id, access_start_time, type]);
    return rows[0];
};

const updateAdminAccessById = async (id, access) => {
    const {admin_id, auditory_id, access_start_time, type} = access;
    const query = `UPDATE accesscontrol_admin
                   SET admin_id          = coalesce($1, admin_id),
                       auditory_id       = coalesce($2, auditory_id),
                       access_start_time = coalesce($3, access_start_time),
                       type              = coalesce($4, type)
                   WHERE id = $5
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [admin_id, auditory_id, access_start_time, type, id]);
    return rows[0];
};

const deleteAdminAccessById = async (id) => {
    const query = `DELETE
                   FROM accesscontrol_admin
                   WHERE id = $1
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [id]);
    return rows[0];
};

const grantAccessByStaffId = async (access) => {
    const {staff_id, auditory_id, access_start_time, type} = access;
    const query = `INSERT INTO accesscontrol_staff (staff_id, auditory_id, access_start_time, type)
                   VALUES ($1, $2, $3, $4)
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [staff_id, auditory_id, access_start_time, type]);
    return rows[0];
};

const updateStaffAccessById = async (id, access) => {
    const {staff_id, auditory_id, access_start_time, type} = access;
    const query = `UPDATE accesscontrol_staff
                   SET staff_id          = coalesce($1, staff_id),
                       auditory_id       = coalesce($2, auditory_id),
                       access_start_time = coalesce($3, access_start_time),
                       type              = coalesce($4, type)
                   WHERE id = $5
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [staff_id, auditory_id, access_start_time, type, id]);
    return rows[0];
};

const deleteStaffAccessById = async (id) => {
    const query = `DELETE
                   FROM accesscontrol_staff
                   WHERE id = $1
                   RETURNING *`;
    const {rows} = await dbPool.query(query, [id]);
    return rows[0];
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