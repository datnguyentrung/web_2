const connection = require("../config/database");
const {
    getAllUsers
} = require("../services/homeService");

const getHomePage = async (req, res) => {
    let results = await getAllUsers();
    res.render('home.ejs', { listUsers: results })
}

const postCreatePage = (req, res) => {
    res.render('create-hv.ejs')
}

const postAddHocVien = async (req, res) => {
    let { myname, cs, capdai, chucvu, phone } = req.body;
    let [results, fields] = await connection.query(
        `INSERT INTO DSHV (name, cs, capdai, chucvu, phone) VALUES (?, ?, ?, ?, ?)`,
        [myname, cs, capdai, chucvu, phone]
    );
    res.redirect('/home');
}


module.exports = {
    getHomePage, postCreatePage, postAddHocVien
}