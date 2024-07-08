const { User } = require('../db.js');

const allUser = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

module.exports = allUser;
