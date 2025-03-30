const connection = require("../config/database");

const getAllUsers = async (trangthai, cs, dai,
    chucvu, phone) => {
    let sql = `SELECT * FROM dshv`;
    let conditions = [];
    let values = [];

    if (trangthai && trangthai !== 'Chọn tất cả') {
        conditions.push(`trangthai = ?`);
        values.push(trangthai);
    }
    if (cs && cs !== 'Chọn tất cả') {
        conditions.push(`cs = ?`);
        values.push(cs);
    }
    if (dai && dai !== 'Chọn tất cả') {
        conditions.push(`dai = ?`);
        values.push(dai);
    }
    if (chucvu && chucvu !== 'Chọn tất cả') {
        conditions.push(`chucvu = ?`);
        values.push(chucvu);
    }
    if (phone && phone !== 'Chọn tất cả') {
        conditions.push(`phone = ?`);
        values.push(phone);
    }

    // Nếu có điều kiện, thêm WHERE + nối điều kiện bằng AND
    if (conditions.length > 0) {
        sql += ` WHERE ` + conditions.join(" AND ");
    }

    let [results, fields] = await connection.query(sql, values);
    return results;
};

const getUniqueValues = async (column) => {
    let [results] = await connection.query(`SELECT DISTINCT ${column} FROM dshv`);

    // Chuyển đổi thành mảng giá trị và thêm "Chọn tất cả"
    let values = results.map(row => row[column]);
    values.unshift("Chọn tất cả");

    return values;
};


module.exports = {
    getAllUsers, getUniqueValues
}