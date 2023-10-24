const path = require('path');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const logErrors = require('./middleware/errorHandler');
const jwtVerify = require('./middleware/jwtVerify');

const PORT = process.env.PORT || 3500;

//Custom middlewares
app.use(logger);

app.use(credentials);

//CORS - with options. 
app.use(cors(corsOptions));

//Built in middlewares - https://expressjs.com/en/4x/api.html#express.urlencoded
//Built-in middleware function that parses incoming requests with urlencoded payloads/formdata
app.use(express.urlencoded({ extended: false }));

//Built-in middleware for static contents
//The first argument '/' is default , can even be omitted for root directory
app.use('/',express.static(path.join(__dirname, 'public')));
//configuring static content for any non-root path files as well e.g subdir/index.html & subdir/test.html
app.use('/subdir',express.static(path.join(__dirname, 'public')));


//Built-in middleware for json
app.use(express.json());

//Middleware for cookie parsing
app.use(cookieParser());

//Using the router defined for the root directory
app.use('/', require('./routes/root'));
//Using the router defined for subdir
app.use('/subdir', require('./routes/subdir'));

app.use('/register', require('./routes/api/register'));
app.use('/auth', require('./routes/api/auth'));
app.use('/logout', require('./routes/api/logout'));
app.use('/refresh', require('./routes/api/refresh'));

//This causes all /employee to have jwtVerify middleware executed. Even with out the jwtVerify 
//in the route definition in routes/api/employee.js
app.use(jwtVerify);
app.use('/employees', require('./routes/api/employee'));

//route handlers 
app.get('/hello(.html)?', (req, res, next) => {
    console.log('hello.html requested');
    next();
}, (req, res) => {
    res.send("Hello everyone... Welcome to route handlers");
});

//Route handlers chaining 
const fnOne = (req, res, next) => {
    console.log("Calling function one ");
    next();
}
const fnTwo = (req, res, next) => {
    console.log("Calling function two ");
    next();
}
const fnThree = (req, res) => {
    console.log("Calling function three ");
    res.send("Chaining call ends here..");
}
// Define some funcions as above and use them in the chaining as below
app.get('/chain(.html)?', [fnOne, fnTwo, fnThree]);

/* 
app.get('^/*', (req, res) => {
    console.log('route does not exist - 404 redirected');
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
}); 

*/

//Using app.all() instead of app.get() for 404 - accepts all methods and allows regex
app.all('*', (req, res)=>{
    console.log('route does not exist - 404 redirected');
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }else if(req.accepts('json')){
        res.json({error : '404 not found' });
    }else{
        res.type('txt').send('404 not found');
    }
});

app.use(logErrors);

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });