const dbPool = require("../config/db");
const jwt = require("jsonwebtoken");

const getStaff = async () => {
    const query = `SELECT name,
                          lastname,
                          secondname,
                          role_id,
                          code,
                          phone,
                          mail,
                          enter_token
                   FROM staff;`;
    const {rows} = await dbPool.query(query);
    return rows;
};

const addStaff = async (staffs) => {
    const results = [];
    for (const staff of staffs) {
        const {name, secondname, lastname, role_id, phone, mail} = staff;

        const query = `
            INSERT INTO staff (name, secondname, lastname, role_id, phone, mail)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const result = await dbPool.query(query, [name, secondname, lastname, role_id, phone, mail]);
        results.push(result.rows);
    }
    return results;
};

const updateStaff = async (id, staff) => {
    const {name, secondname, lastname, role_id, phone, mail} = staff;

    const query = `
        UPDATE staff
        SET name       = COALESCE($1, name),
            secondname = COALESCE($2, secondname),
            lastname   = COALESCE($3, lastname),
            role_id    = COALESCE($4, role_id),
            phone      = COALESCE($5, phone),
            mail       = COALESCE($6, mail)
        WHERE id = $7
        RETURNING *;
    `;
    const {rows} = await dbPool.query(query, [name, secondname, lastname, role_id, phone, mail, id]);
    return rows;
};

const deleteStaff = async (id) => {
    const query = `DELETE
                   FROM staff
                   WHERE id = $1
                   RETURNING *;`;
    const {rows} = await dbPool.query(query, [id]);
    return rows;
};

module.exports = {getStaff, addStaff, updateStaff, deleteStaff};