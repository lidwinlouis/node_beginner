const ROLES_LIST = require('../config/roles_list');

const validateRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const permittedRoles = [...allowedRoles];
        const {user, roles } = req;
        console.log("allowedRoles" , permittedRoles);
        console.log("User roles" , roles);

        const permitted = roles.map(role => permittedRoles.includes(role)).find( val => val===true);
        console.log('Permitted ' , permitted);
        if(!permitted) return res.sendStatus(401); //unauthorized
        
        next();
        
    }
}

module.exports = validateRoles;