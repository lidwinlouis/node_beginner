const path = require('path');
const fs = require('fs');

const rs = fs.createReadStream(path.join(__dirname, 'files', 'loreminput.txt'), 'utf-8');

const ws = fs.createWriteStream(path.join(__dirname, 'files', 'newlorem.txt'));

//Method-1
/* rs.on('data',(dataChunk)=>{
    ws.write(dataChunk);
});
 */

//more efficient method.
rs.pipe(ws);