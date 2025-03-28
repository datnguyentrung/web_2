const express = require('express');
const {
    getTrainingPage
} = require('../controllers/trainingController');
const router = express.Router();

router.get('/', getTrainingPage);

module.exports = router;