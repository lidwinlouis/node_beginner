const bcrypt = require('bcrypt');
const fsPromise = require('fs/promises');
const path = require('path');

const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const handleRegistration = async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ "message": `Username and password are required.` });
    }

    const duplicateUser = userDB.users.find(person => person.username === username);
    if (duplicateUser) {
        return res.status(409).json({ "message": `User ${username} already exists` });
    }
    try {
        //bcrypt the password 
        const encryptPwd = await bcrypt.hash(req.body.password, 10);
        const newUser = {
            "username": username,
            "password": encryptPwd
        }
        console.log(newUser);
        userDB.setUsers([...userDB.users, newUser]);
        console.log(userDB.users);

        await fsPromise.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(userDB.users));
        console.log(userDB.users);
        return res.status(201).json({ 'message': `User ${username} has been created` });

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}

module.exports = { handleRegistration }