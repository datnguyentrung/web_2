const connection = require("../config/database");
const {
    getAllUsers, getUniqueValues
} = require("../services/homeService");

const getHomePage = async (req, res) => {
    let { filter_cs, filter_capdai, filter_chucvu } = req.query; // Đọc từ query string

    filter_cs = filter_cs || "Chọn tất cả";
    filter_capdai = filter_capdai || "Chọn tất cả";
    filter_chucvu = filter_chucvu || "Chọn tất cả";
    // Lấy danh sách học viên theo bộ lọc (hoặc toàn bộ nếu không)
    let results = await getAllUsers(filter_cs, filter_capdai, filter_chucvu);

    // Lấy danh sách các giá trị duy nhất
    let unq_cs = await getUniqueValues("cs");
    let unq_capdai = await getUniqueValues("capdai");
    let unq_chucvu = await getUniqueValues("chucvu");
    let unq_phone = await getUniqueValues("phone");

    res.render('home.ejs', {
        listUsers: results,
        filterUsers: {
            unq_cs, unq_capdai, unq_chucvu, unq_phone
        }
    });
};



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

// const getDropDownData = async (req, res) => {
//     try {
//         let sql = `SELECT * FROM DSHV`;

//         let [results, fields] = await connection.query(

//         );
//         res.render(results,);
//     } catch () {

//     }
// }

module.exports = {
    getHomePage, postCreatePage, postAddHocVien
}