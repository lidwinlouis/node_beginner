const User = require('../model/User');


const handleLogout = async (req, res) => {

   
    const refreshToken = req.cookies.jwt;
   
    if (!refreshToken) return res.sendStatus(204);
    
    //Is refresh token in DB
    //const foundUser = User.findOne({refreshToken : refreshToken}).exec(); OR
    const foundUser = await User.findOne({refreshToken}).exec();
    //if no, just remove the cookies from the browser session.
    if (!foundUser){
        res.clearCookie('jwt', { httpOnly: true, sameSite : 'None', secure : true });
        return res.sendStatus(204); //No Content
    }
    
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    res.sendStatus(204);
}

module.exports = { handleLogout }