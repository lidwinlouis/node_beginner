const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3500;

app.get('^/$|/index(.html)?', (req, res)=>{
    console.log('Index.html attemtepd');
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/new-page(.html)?', (req, res)=>{
    console.log('new-page.html attemtepd');
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});
app.get('^/old-page(.html)?', (req, res)=>{
    console.log('old-page getting redirected to new-page.html');
    res.redirect(301, '/new-page.html'); //302 by default
});

//route handlers 
app.get('/hello(.html)?', (req, res, next)=>{
    console.log('hello.html requested');
    next();
},(req, res)=>{
    res.send("Hello everyone... Welcome to route handlers");
});


//Route handlers chaining 
const fnOne = (req, res, next) =>{
    console.log("Calling function one ");
    next();
}
const fnTwo = (req, res, next) =>{
    console.log("Calling function two ");
    next();
}
const fnThree = (req, res) =>{
    console.log("Calling function three ");
    res.send("Chaining call ends here..");
}
// Define some funcions as above and use them in the chaining as below
app.get('/chain(.html)?', [fnOne, fnTwo, fnThree]);




app.get('^/*', (req, res)=>{
    console.log('route does not exist - 404 redirected');
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });