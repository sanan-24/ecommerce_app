const {getProfileService}= require('../services/profileServices');
const ApiResponse = require("../utils/ApiResponse");

const getProfile = async (req, res)=>{
    const userId = req.userId; // auth middleware se attach hua user id
    const userProfile = await getProfileService(userId);
    return res.status(200).json(
        new ApiResponse(200, "User profile retrieved successfully", userProfile)
    );
}
module.exports = {
    getProfile
}