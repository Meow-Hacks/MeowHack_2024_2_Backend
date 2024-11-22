const jwt = require('jsonwebtoken');
const enterTokenModel = require('../models/enterTokenModel');

const generateEnterToken = async (req, res) => {
    // #swagger.tags = ['Enter Tokens']
    try {
        const {role_id, user_id} = req.body;
        const user = await enterTokenModel.getUserById(role_id, user_id);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const tokenPayload = {
            id: user[0].id,
            name: user[0].name,
            secondname: user[0].secondname,
            lastname: user[0].lastname,
            role_id: user[0].role_id,
            code: user[0].code
        };

        const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, {expiresIn: '365d'});
        await enterTokenModel.updateUserToken(role_id, user_id, token);

        res.status(200).json({message: 'Enter token generated'});
    } catch (err) {
        res.status(500).json({message: 'Error generating enter token', error: err.message});
    }
};

module.exports = {generateEnterToken};