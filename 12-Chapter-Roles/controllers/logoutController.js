const fsPromise = require('fs/promises');
const path = require('path');

//const userDB = require('../model/users.json');

const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}


const handleLogout = async (req, res) => {

   
    const refreshToken = req.cookies.jwt;
   
    if (!refreshToken) return res.sendStatus(204);
    
    //Is refresh token in DB
    const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
    //if no, just remove the cookies from the browser session.
    if (!foundUser){
        res.clearCookie('jwt', { httpOnly: true, sameSite : 'None', secure : true });
        return res.sendStatus(204); //No Content
    }

    const otherUsers = userDB.users.filter( person => person.id !== foundUser.id);
    const currentUser = { ...foundUser, refreshToken: ''};
    userDB.setUsers([...otherUsers, currentUser]);

    await fsPromise.writeFile(
        path.join(__dirname, '..', 'model' , 'users.json'),
        JSON.stringify(userDB.users)
    );
}

module.exports = { handleLogout }