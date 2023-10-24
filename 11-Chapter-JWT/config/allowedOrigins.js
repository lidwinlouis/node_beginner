//The localhost and live servers(with port 5500) and google can be removed in the final prod code. 
const allowedOrigins = [
    'https://www.mysite.com/',
    'http://127.0.0.1:5500',
    'https://localhost:3500',
    'https://www.google.com'
];

module.exports = allowedOrigins;