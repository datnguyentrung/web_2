const express = require('express');
const {
    postAddCourse, getCreateCourse, getCourses,
    getUpdateCourse, postUpdateCourse
} = require('../controllers/courseController');
const router = express.Router();


router.get('/', getCourses);
router.get('/create-course', getCreateCourse);
router.post('/add-course', postAddCourse);

router.get('/edit-course/:id', getUpdateCourse); // Lấy trang form cập nhật
router.post('/update-course', postUpdateCourse); // Cập nhật khóa học
// router.delete('/delete-course/:id', deleteCourse); // Xóa khóa học

module.exports = router;