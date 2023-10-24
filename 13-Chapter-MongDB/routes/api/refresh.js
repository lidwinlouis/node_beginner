const express = require('express');
const router = express.Router();
const refreshController = require('../../controllers/refreshController');

router.get('/', refreshController.refreshHandler);

module.exports = router;
