const connection = require("../config/database");

const getAllUsers = async (cs, capdai, chucvu) => {
    let sql = `SELECT * FROM DSHV`;
    let conditions = [];
    let values = [];

    if (cs !== "Chọn tất cả") {
        conditions.push(`cs = ?`);
        values.push(cs);
    }
    if (capdai !== "Chọn tất cả") {
        conditions.push(`capdai = ?`);
        values.push(capdai);
    }
    if (chucvu !== "Chọn tất cả") {
        conditions.push(`chucvu = ?`);
        values.push(chucvu);
    }

    // Nếu có điều kiện, thêm WHERE + nối điều kiện bằng AND
    if (conditions.length > 0) {
        sql += ` WHERE ` + conditions.join(" AND ");
    }

    let [results, fields] = await connection.query(sql, values);
    return results;
};

const getUniqueValues = async (column) => {
    let [results] = await connection.query(`SELECT DISTINCT ${column} FROM DSHV`);

    // Chuyển đổi thành mảng giá trị và thêm "Chọn tất cả"
    let values = results.map(row => row[column]);
    values.unshift("Chọn tất cả");

    return values;
};


module.exports = {
    getAllUsers, getUniqueValues
}