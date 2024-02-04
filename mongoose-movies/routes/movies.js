var express = require('express');
var router = express.Router();

const movieCtrl = require('../controllers/movies')

router.get('/new', movieCtrl.new)

router.post('/', movieCtrl.create)

module.exports = router;
