const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtVerify = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    jwt.verify(token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) res.sendStatus(401); //unauthorized
            else {
                req.user = decoded.username;
                next();
            }
        });


}

module.exports = jwtVerify;