const bcrypt = require('bcrypt');
const fsPromise = require('fs/promises');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//const userDB = require('../model/users.json');

const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}


const authHandler = async (req, res) => {

    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ "message": "Username and password are required." });
    }

    const foundUser = userDB.users.find(person => person.username === username);
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

        const otherUsers = userDB.users.filter(person => person.username !== username);

        const currentUser = { ...foundUser, refreshToken };

        userDB.setUsers([...otherUsers, currentUser]);

        await fsPromise.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(userDB.users));

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