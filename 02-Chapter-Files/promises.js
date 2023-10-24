const fsPromises = require('fs/promises');
//OR
const fsPromises1 = require('fs').promises;

const path = require('path');

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'MyText.txt'), 'utf-8');
        //console.log(data);
        await fsPromises.unlink(path.join(__dirname, 'files', 'MyText.txt'));
        await fsPromises.writeFile(path.join(__dirname, 'files', 'MyNewText.txt'), data);
        await fsPromises1.appendFile(path.join(__dirname, 'files', 'MyNewText.txt'), '\nIs everything alright?');
        await fsPromises1.rename(path.join(__dirname, 'files', 'MyNewText.txt'), path.join(__dirname, 'files', 'MyText.txt'));
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'MyText.txt'), 'utf-8');
        console.log(newData);

    } catch (err) {
        console.error(err);
    }
}

fileOps();