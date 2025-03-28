const connection = require("../config/database");
const {
    getAllCourses, addCourse, getCourseById
} = require("../services/courseService");

const getCourses = async (req, res) => {
    let results = await getAllCourses();
    res.render('course.ejs', { listCourses: results })
}

const postAddCourse = async (req, res) => {
    let { khoahoc, mohinh, thoigian, coso, sotien } = req.body;

    await addCourse(khoahoc, mohinh, thoigian, coso, sotien);
    res.redirect('/course');
}

const getCreateCourse = (req, res) => {
    res.render('create-course.ejs')
}

const getUpdateCourse = async (req, res) => {
    const courseId = req.params.id;

    let course = await getCourseById(courseId);
    res.render('edit-course.ejs', { courseEdit: course }) // x <- y
}

const postUpdateCourse = async (req, res) => {
    let id = req.body.id;
    let { khoahoc, mohinh, thoigian, coso, sotien } = req.body;

    console.log("Dữ liệu nhận được:", id, khoahoc, mohinh, thoigian, coso, sotien); // Debug

    let [results, fields] = await connection.query(
        `UPDATE khoa_hoc SET khoahoc = ?, mohinh = ?, thoigian = ?, coso = ?, sotien = ? WHERE id = ?`,
        [khoahoc, mohinh, thoigian, coso, sotien, id]
    );

    console.log("Kết quả query:", results); // Debug xem có bản ghi nào được cập nhật không

    res.redirect('/course');
};


module.exports = {
    postAddCourse, getCourses, getCreateCourse,
    getUpdateCourse, postUpdateCourse
    // deleteCourse
}