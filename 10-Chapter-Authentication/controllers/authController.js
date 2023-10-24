const bcrypt = require('bcrypt');

const users = require('../model/users.json');

const authHandler = async (req, res) => {

    const { username, password } = req.body;
    if(!username || !password){
        return res.status(400).json({"message" : "Username and password are required."});
    }

    const foundUser = users.find(person => person.username === username);
    if(!foundUser) return res.sendStatus(401); //Unauthorized
    
    const passMatch = await bcrypt.compare(password, foundUser.password);

    if(passMatch){
        res.status(200).json({'success' : `${username} is logged in!`});
    }else{
        res.sendStatus(401);  //Unauthorized
    }

}

module.exports = { authHandler }