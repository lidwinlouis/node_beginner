const fs = require('fs');

const directoryName = './newFolder';

if (!fs.existsSync(directoryName)) {
    fs.mkdir(directoryName, err => {
        if (err) {
            throw err;
        }
        console.log('Directory created');
    });
}

if (fs.existsSync(directoryName)) {
    fs.rmdir(directoryName, err => {
        if (err) {
            throw err;
        }
        console.log('Directory deleted');
    });

}

process.on("uncaughtException", err => {
    console.error(`Uncaught exception occured ${err}`);
})