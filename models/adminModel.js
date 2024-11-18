const dbPool = require("../config/db");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const getAdmins = async () => {
    const query = `SELECT name,
                          secondname,
                          lastname,
                          role_id,
                          code,
                          phone,
                          mail,
                          enter_token
                   FROM admins;`;
    const {rows} = await dbPool.query(query);
    return rows;
};

const addAdmins = async (admins) => {
    const results = [];
    for (const admin of admins) {
        const {name, secondname, lastname, role_id, code, phone, mail, password} = admin;
        const enter_token = jwt.sign({
            name: admin.name,
            secondname: admin.secondname,
            lastname: admin.lastname,
            role_id: admin.role_id,
            code: admin.code,
            phone: admin.phone,
            mail: admin.mail
        }, process.env.SECRET_KEY, {expiresIn: '365d'});
        const query = `
            INSERT INTO admins (name, secondname, lastname, role_id, code, phone, mail, password, enter_token)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `;
        const result = await dbPool.query(query, [name, secondname, lastname, role_id, code, phone, mail, await bcrypt.hash(password, 10), enter_token]);
        results.push(result.rows);
    }
    return results;
};

const updateAdmin = async (id, admin) => {
    const {name, secondname, lastname, role_id, code, phone, mail, password} = admin;
    const enter_token = jwt.sign({
        name: admin.name,
        secondname: admin.secondname,
        lastname: admin.lastname,
        role_id: admin.role_id,
        code: admin.code,
        phone: admin.phone,
        mail: admin.mail
    }, process.env.SECRET_KEY, {expiresIn: '365d'});
    const query = `
        UPDATE admins
        SET name        = COALESCE($1, name),
            secondname  = COALESCE($2, secondname),
            lastname    = COALESCE($3, lastname),
            role_id     = COALESCE($4, role_id),
            code        = COALESCE($5, code),
            phone       = COALESCE($6, phone),
            mail        = COALESCE($7, mail),
            password    = COALESCE($8, password),
            enter_token = coalesce($9, enter_token)
        WHERE id = $10
        RETURNING *;
    `;
    const {rows} = await dbPool.query(query, [name, secondname, lastname, role_id, code, phone, mail, await bcrypt.hash(password, 10), enter_token, id]);
    return rows;
};

const deleteAdmin = async (id) => {
    const query = `DELETE
                   FROM admins
                   WHERE id = $1
                   RETURNING *;`;
    const {rows} = await dbPool.query(query, [id]);
    return rows;
};

module.exports = {getAdmins, addAdmins, updateAdmin, deleteAdmin};