const dbPool = require("../config/db");
const bcrypt = require('bcryptjs');
const generator = require('generate-password');
const mailer = require('../middleware/mailer');


const getAdmins = async () => {
    const query = `SELECT id,
                          name,
                          secondname,
                          lastname,
                          role_id,
                          level,
                          code,
                          phone,
                          mail,
                          enter_token
                   FROM admins;`;
    const {rows} = await dbPool.query(query);
    return rows;
};

const getAdminById = async (id) => {
    const query = `SELECT id,
                          name,
                          secondname,
                          lastname,
                          role_id,
                          level,
                          code,
                          phone,
                          mail,
                          enter_token
                   FROM admins
                   WHERE id = $1;`;
    const {rows} = await dbPool.query(query, [id]);
    return rows[0];
};

const addAdmins = async (admins) => {
    const results = [];
    for (const admin of admins) {
        const {name, secondname, lastname, role_id, level, phone, mail} = admin;

        const password = generator.generate({
            length: 16,
            numbers: true,
            symbols: true,
            lowercase: true,
            uppercase: true
        });

        mailer.sendEmail(mail, 'Вам посылка от эльдорадо', password);

        const query = `
            INSERT INTO admins (name, secondname, lastname, role_id, level, phone, mail, password)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;
        const result = await dbPool.query(query, [name, secondname, lastname, role_id, level, phone, mail, await bcrypt.hash(password, 10)]);
        results.push(result.rows);
    }
    return results;
};

const updateAdmin = async (id, admin) => {
    const {name, secondname, lastname, role_id, level, phone, mail} = admin;

    const query = `
        UPDATE admins
        SET name       = COALESCE($1, name),
            secondname = COALESCE($2, secondname),
            lastname   = COALESCE($3, lastname),
            role_id    = COALESCE($4, role_id),
            level      = coalesce($5, level),
            phone      = COALESCE($6, phone),
            mail       = COALESCE($7, mail)
        WHERE id = $8
        RETURNING *;
    `;
    const {rows} = await dbPool.query(query, [name, secondname, lastname, role_id, level, phone, mail, id]);
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

module.exports = {getAdmins, getAdminById, addAdmins, updateAdmin, deleteAdmin};