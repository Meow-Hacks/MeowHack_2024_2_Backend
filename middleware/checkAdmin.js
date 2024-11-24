const jwt = require('jsonwebtoken');

function checkAdmin(req, res, next) {
    /* #swagger.security = [{
            "bearerAuth": []
    }] */

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const {role, level} = decoded;

    if (role !== "admin") {
        return res.status(403).json({message: "Access denied. Admins only."});
    }

    req.user = decoded;
    next();
}


function checkAllAdmin(req, res, next) {
    /* #swagger.security = [{
            "bearerAuth": []
    }] */

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const {role, level} = decoded;

    if (role !== "admin") {
        return res.status(403).json({message: "Access denied. Admins only."});
    }

    if (level !== "all") {
        return res.status(403).json({message: "Access denied. All admins only."});
    }

    req.user = decoded;
    next();
}

function checkRoomsAdmin(req, res, next) {
    /* #swagger.security = [{
            "bearerAuth": []
    }] */

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const {role, level} = decoded;

    if (role !== "admin") {
        return res.status(403).json({message: "Access denied. Admins only."});
    }

    if ((level !== "rooms") || (level !== "all")) {
        return res.status(403).json({message: "Access denied. Rooms or all admins only."});
    }

    req.user = decoded;
    next();
}

function checkLessonsAdmin(req, res, next) {
    /* #swagger.security = [{
            "bearerAuth": []
    }] */

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const {role, level} = decoded;

    if (role !== "admin") {
        return res.status(403).json({message: "Access denied. Admins only."});
    }

    if ((level !== "lessons") || (level !== "all")) {
        return res.status(403).json({message: "Access denied. Lessons or all admins only."});
    }

    req.user = decoded;
    next();
}

module.exports = {checkRoomsAdmin, checkLessonsAdmin, checkAllAdmin, checkAdmin};
