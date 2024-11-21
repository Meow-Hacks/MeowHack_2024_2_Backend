const dbPool = require("../config/db");

const getStudentHistory = async () => {
    const query = `SELECT *
                   FROM entryexithistory_student`;
    const {rows} = await dbPool.query(query);
    return rows;
};

const getAdminHistory = async () => {
    const query = `SELECT *
                   FROM entryexithistory_admin`;
    const {rows} = await dbPool.query(query);
    return rows;
};

const getTeacherHistory = async () => {
    const query = `SELECT *
                   FROM entryexithistory_teacher`;
    const {rows} = await dbPool.query(query);
    return rows;
};

const getStuffHistory = async () => {
    const query = `SELECT *
                   FROM entryexithistory_staff`;
    const {rows} = await dbPool.query(query);
    return rows;
};

module.exports = {getStudentHistory, getTeacherHistory, getAdminHistory, getStuffHistory};