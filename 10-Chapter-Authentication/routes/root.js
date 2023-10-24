const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    console.log('Index.html attempted');
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});
router.get('/new-page(.html)?', (req, res) => {
    console.log('new-page.html attempted');
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
});
router.get('^/old-page(.html)?', (req, res) => {
    console.log('old-page getting redirected to new-page.html');
    res.redirect(301, '/new-page.html'); //302 by default
});


module.exports = router;