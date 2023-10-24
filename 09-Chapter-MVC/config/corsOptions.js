//The localhost and live servers(with port 5500) and google can be removed in the final prod code. 
const whitelist = [
    'https://www.mysite.com/',
    'http://127.0.0.1:5500',
    'https://localhost:3500',
    'https://www.google.com'
];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
};

module.exports = corsOptions;