'use strict';

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.use('/clients', require('./clients'))
router.use('/properties', require('./properties'))

module.exports = router;
