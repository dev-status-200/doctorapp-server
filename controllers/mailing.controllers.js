const mailSender = require("../services/mailSender");

exports.create = async(req, res) => {
    try {
        
        res.json({status:"success"});
    } catch (error) {
        res.status(400).json({status:"error"});
    }
};
