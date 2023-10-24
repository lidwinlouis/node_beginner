const bcrypt = require('bcrypt');
const User = require('../model/User');
const jwt = require('jsonwebtoken');


const authHandler = async (req, res) => {

    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ "message": "Username and password are required." });
    }
    //const foundUser = User.findOne({username : username }).exec();  OR
    const foundUser = await User.findOne({username }).exec();

    if (!foundUser) return res.sendStatus(401); //Unauthorized

    const passMatch = await bcrypt.compare(password, foundUser.password);
    const roles = Object.values(foundUser.roles);

    if (passMatch) {
        //JWT Tokens - jwt.sign( payload, secretkey, {options})
        const accessToken = jwt.sign({
                "UserInfo": {
                    "username": username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "2h" });

        const refreshToken = jwt.sign(
            {
                "UserInfo": {
                    "username": username,
                    "roles": roles
                }
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "2d" });

        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log("Saved user with RefreshToken ", result);

        //secure : true did not work wih the api calls in thunder client, the videos says its required in production
        //res.cookie('jwt', refreshToken, { httpOnly: true, sameSite : 'None', secure : true, maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });

        //res.status(200).json({'success' : `${username} is logged in!`});

    } else {
        res.sendStatus(401);  //Unauthorized
    }

}

module.exports = { authHandler }