const connection = require("../config/database");
const {

} = require("../services/trainingService");

const getTrainingPage = async (req, res) => {
    res.render('./training/training.ejs')
}

module.exports = {
    getTrainingPage
}