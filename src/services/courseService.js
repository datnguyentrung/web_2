const connection = require("../config/database");

const getAllCourses = async () => {
    let [results, fields] = await connection.query('SELECT * FROM khoa_hoc');
    return results;
}

const addCourse = async (khoahoc, mohinh, thoigian, coso, sotien) => {
    // ham lay chu cai dau cua moi bien
    const getInitials = (str) => {
        return str
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase();
    }

    //tao id
    let id = `${getInitials(khoahoc)}-${getInitials(mohinh)}-${getInitials(thoigian)}M`;

    let [results, fields] = await connection.query(
        `INSERT INTO khoa_hoc (id, khoahoc, mohinh, thoigian, coso, sotien) VALUES (?, ?, ?, ?, ?, ?)`,
        [id, khoahoc, mohinh, thoigian, coso, sotien]
    );
}

const getCourseById = async (courseId) => {
    let [results, fields] = await connection.query(
        `SELECT * FROM khoa_hoc WHERE id = ?`,
        [courseId]
    );
    let course = results && results.length > 0 ? results[0] : {};
    return course;
}

module.exports = {
    getAllCourses, addCourse, getCourseById
}