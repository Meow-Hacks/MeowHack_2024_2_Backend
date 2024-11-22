const dbPool = require("../config/db");

const getUserById = async (roleId, userId) => {
    let tableName;
    switch (roleId) {
        case 1:
            tableName = 'admins';
            break;
        case 2:
            tableName = 'teachers';
            break;
        case 3:
            tableName = 'students';
            break;
        case 4:
            tableName = 'staff';
            break;
        default:
            throw new Error('Invalid role_id');
    }

    const query = `SELECT *
                   FROM ${tableName}
                   WHERE id = $1`;
    const {rows} = await dbPool.query(query, [userId]);
    return rows;
};

const updateUserToken = async (roleId, userId, token) => {
    let tableName;
    switch (roleId) {
        case 1:
            tableName = 'admins';
            break;
        case 2:
            tableName = 'teachers';
            break;
        case 3:
            tableName = 'students';
            break;
        case 4:
            tableName = 'staff';
            break;
        default:
            throw new Error('Invalid role_id');
    }

    const query = `UPDATE ${tableName}
                   SET enter_token = $1
                   WHERE id = $2`;
    await dbPool.query(query, [token, userId]);
}

module.exports = {getUserById, updateUserToken};