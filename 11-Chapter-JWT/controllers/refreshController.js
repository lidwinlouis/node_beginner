const jwt = require('jsonwebtoken');
require('dotenv').config();

const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}


const refreshHandler = (req, res) => {
    
    const cookie = req.cookies;
    //console.log("cookie",req.cookies);
    if (!cookie?.jwt) return res.sendStatus(401); //unauthorized
    
    const refreshToken = cookie.jwt;
   
    const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(401); //Unauthorized

    jwt.verify(refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded)=>{
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403); //Forbidden

            const accessToken = jwt.sign(
                {"username" : decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn : "1d"}
            );

            res.json({accessToken});

        })
   

}

module.exports = { refreshHandler }