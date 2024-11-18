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
        const {name, secondname, lastname, role_id, code, phone, mail} = staff;
        const enter_token = jwt.sign({
            name: staff.name,
            secondname: staff.secondname,
            lastname: staff.lastname,
            role_id: staff.role_id,
            code: staff.code,
            phone: staff.phone,
            mail: staff.mail
        }, process.env.SECRET_KEY, {expiresIn: '365d'});
        const query = `
            INSERT INTO staff (name, secondname, lastname, role_id, code, phone, mail, enter_token)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;
        const result = await dbPool.query(query, [name, secondname, lastname, role_id, code, phone, mail, enter_token]);
        results.push(result.rows);
    }
    return results;
};

const updateStaff = async (id, staff) => {
    const {name, secondname, lastname, role_id, code, phone, mail} = staff;
    const enter_token = jwt.sign({
        name: staff.name,
        secondname: staff.secondname,
        lastname: staff.lastname,
        role_id: staff.role_id,
        code: staff.code,
        phone: staff.phone,
        mail: staff.mail
    }, process.env.SECRET_KEY, {expiresIn: '365d'});
    const query = `
        UPDATE staff
        SET name        = COALESCE($1, name),
            secondname  = COALESCE($2, secondname),
            lastname    = COALESCE($3, lastname),
            role_id     = COALESCE($4, role_id),
            code        = COALESCE($5, code),
            phone       = COALESCE($6, phone),
            mail        = COALESCE($7, mail),
            enter_token = coalesce($8, enter_token)
        WHERE id = $9
        RETURNING *;
    `;
    const {rows} = await dbPool.query(query, [name, secondname, lastname, role_id, code, phone, mail, enter_token, id]);
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