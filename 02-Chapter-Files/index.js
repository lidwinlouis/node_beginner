const path = require('path');

//https://nodejs.org/dist/latest-v18.x/docs/api/fs.html
const fs = require('fs');


//These fs functions are asynchronous
/* 
fs.readFile(path.join(__dirname, 'files', 'MyText.txt'), (err, data) =>{
    if(err){
        throw new err;
    }
    console.log('\nWithout encoding while reading [.toString()] : ',data.toString());
});

fs.readFile(path.join(__dirname, 'files', 'MyText.txt'), 'utf-8', (err, data) =>{
    if(err){
        throw new err;
    }
    console.log('\nWith UTF-8 encoding while reading : ',data);
}); 
*/

//This could come first as the readFile operation is asynchrounous 
console.log("File path : ", path.join(__dirname, 'files', 'MyText.txt'));

//Nesting more functions in the callback functions in order to maintain the order as these are async calls.
//This will be later overcome using promises and async .. await
fs.readFile(path.join(__dirname, 'files', 'MyText.txt'), 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('Read completed - Inside first call back ');
    fs.writeFile(path.join(__dirname, 'files', 'WriteOutput.txt'), data, (err) => {
        if (err) {
            throw err;
        }
        console.log('Write completed - Inside Second call back ');

        fs.appendFile(path.join(__dirname, 'files', 'WriteOutput.txt'), "\n\nNew content added", (err) => {
            if (err) {
                throw err;
            }
            console.log('Append completed - Inside third call back ');

            fs.rename(path.join(__dirname, 'files', 'WriteOutput.txt'), path.join(__dirname, 'files', 'newOutput.txt'), (err) => {
                if (err) {
                    throw err;
                }
                console.log('Rename completed - Inside fourth call back ');
                  
            });

        });

    });
});

process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
});