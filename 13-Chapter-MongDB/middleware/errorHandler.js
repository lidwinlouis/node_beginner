const { logEvents } = require('./logEvents');

const logErrors = (err, req, res, next) => {
    console.log(err.stack);
    logEvents(`${err.name} ${err.message}`, 'errors.log');
    res.status(500).send(err.message);
}

module.exports = logErrors;

