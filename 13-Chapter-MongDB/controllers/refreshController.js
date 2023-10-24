const jwt = require('jsonwebtoken');
const User = require('../model/User');

const refreshHandler = async (req, res) => {

    const cookie = req.cookies;
    console.log("cookie",req.cookies);
    if (!cookie?.jwt) return res.sendStatus(401); //unauthorized

    const refreshToken = cookie.jwt;

    const foundUser = await User.findOne({refreshToken}).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized

    jwt.verify(refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.UserInfo.username) return res.sendStatus(403); //Forbidden

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.UserInfo.username,
                        "roles": decoded.UserInfo.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1d" }
            );

            res.json({ accessToken });

        })


}

module.exports = { refreshHandler }