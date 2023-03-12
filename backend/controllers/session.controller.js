const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const login = async (request, response) => {
    const { email, password } = request.body;

    User.query("email").eq(email).exec((error, results) => {
        if(error) {
            return response.status(500).json({ message: 'Internal server error ' + error });
        }else {
            if(results.count == 0) {
                return response.status(401).json({message: 'Invalid email or password'});
            }else {
                const user = results[0];
                bcrypt.compare(password, user.password, function (err, isMatch) {
                    if(err || !isMatch) {
                        return response.status(401).json({message: 'Invalid email or password'});
                    }else {
                        const token = jwt.sign({ id: user.id, email: user.email }, process.env.APIKEY, { expiresIn: '30m' });
                        return response.json({message: "OK", token: token, id: user.id });
                    }
                });
            }
        }
    });
};

const logout = async (request, response) => {
    response.clearCookie('jwt');
    response.status(200).json({message: "OK"});
};

module.exports = {
    login,
    logout
};