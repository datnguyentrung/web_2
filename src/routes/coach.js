const express = require('express');
const {
    getCoachPage
} = require('../controllers/coachController');
const router = express.Router();

router.get('/', getCoachPage);

module.exports = router;