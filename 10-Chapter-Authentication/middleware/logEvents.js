const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const logEvents = async (message, filename) => {

    if (!fs.existsSync(path.join(__dirname, '..' ,'logs'))) {
        fs.mkdir(path.join(__dirname,'..' , 'logs'), err => {
            if (err) {
                throw err;
            }
        });
    }
    const logTime = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
    const logEntry = `${logTime} ${uuid()} : ${message}\n`;
    console.log(logEntry);
    await fsPromises.appendFile(path.join(__dirname, '..' , 'logs', filename), logEntry);

}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url} `, 'access.log');
    next();
}
module.exports = {logger, logEvents};