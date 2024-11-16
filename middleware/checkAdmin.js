const jwt = require('jsonwebtoken');

function checkAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const {role} = decoded;

    if (role !== "admin") {
        return res.status(403).json({message: "Access denied. Admins only."});
    }

    req.user = decoded;
    next();
}

module.exports = checkAdmin;
