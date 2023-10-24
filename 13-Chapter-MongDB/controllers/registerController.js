const bcrypt = require('bcrypt');
const User = require('../model/User');
const ROLES_LIST = require('../config/roles_list');


const handleRegistration = async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ "message": `Username and password are required.` });
    }
    
    const duplicateUser = await User.findOne({username : username }).exec();
    if (duplicateUser) {
        return res.status(409).json({ "message": `User ${username} already exists` });
    }
    try {
        //bcrypt the password 
     
        const encryptPwd = await bcrypt.hash(req.body.password, 10);
        const result = await User.create({
            "username": username,
            "password": encryptPwd,
            "roles" : {
                "User" :ROLES_LIST.User
            }
        });

        /* OR
        const newUser = new User();
        newUser.username = username;
        newUser.password = encryptPwd;
        newUser.roles = ROLES_LIST.User;
        const result = await newUser.save(); 
        */

        console.log('Created user ', result);
        return res.status(201).json({ 'message': `User ${username} has been created` });

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}

module.exports = { handleRegistration }