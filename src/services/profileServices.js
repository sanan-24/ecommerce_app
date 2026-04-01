const {User} = require('../models');
const ApiError = require("../utils/ApiError");

const getProfileService = async (userId) => {
    const user = await User.findOne({
        where: {id: userId},
        attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt']
    });
    if(!user){
        throw new ApiError(404, "User not found");
    }
    return user;
}

module.exports = {
    getProfileService
}