const express = require('express');
const {
    getHomePage, postCreatePage, postAddHocVien
} = require('../controllers/homeController');
const router = express.Router();

router.get('/', getHomePage);

router.get('/create', postCreatePage);

router.post('/add-hv', postAddHocVien);

module.exports = router;