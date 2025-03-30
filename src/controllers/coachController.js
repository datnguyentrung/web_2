const connection = require("../config/database");
const {

} = require("../services/coachService");

const getCoachPage = async (req, res) => {
    res.render('coach/coach.ejs')
}

module.exports = {
    getCoachPage
}