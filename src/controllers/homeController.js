const connection = require("../config/database");
const {
    getAllUsers, getUniqueValues
} = require("../services/homeService");

const getHomePage = async (req, res) => {
    let {
        filter_trangthai, filter_cs, filter_dai,
        filter_chucvu, filter_phone
    } = req.query; // Đọc từ query string

    filter_trangthai = filter_trangthai || "Chọn tất cả";
    filter_cs = filter_cs || "Chọn tất cả";
    filter_dai = filter_dai || "Chọn tất cả";
    filter_chucvu = filter_chucvu || "Chọn tất cả";
    filter_phone = filter_phone || "Chọn tất cả";
    // Lấy danh sách học viên theo bộ lọc (hoặc toàn bộ nếu không)
    let results = await getAllUsers(
        filter_trangthai, filter_cs, filter_dai,
        filter_chucvu, filter_phone
    );

    // Lấy danh sách các giá trị duy nhất
    let unq_trangthai = await getUniqueValues("trangthai")
    let unq_cs = await getUniqueValues("cs");
    let unq_dai = await getUniqueValues("dai");
    let unq_chucvu = await getUniqueValues("chucvu");
    let unq_phone = await getUniqueValues("phone");

    res.render('home.ejs', {
        listUsers: results,
        filterUsers: {
            unq_cs, unq_dai, unq_chucvu,
            unq_phone, unq_trangthai
        }
    });
};



const postCreatePage = (req, res) => {
    res.render('create-hv.ejs')
}

const postAddHocVien = async (req, res) => {
    let { myname, cs, dai, chucvu, phone } = req.body;
    let [results, fields] = await connection.query(
        `INSERT INTO dshv (name, cs, dai, chucvu, phone) VALUES (?, ?, ?, ?, ?)`,
        [myname, cs, dai, chucvu, phone]
    );
    res.redirect('/');
}

module.exports = {
    getHomePage, postCreatePage, postAddHocVien
}