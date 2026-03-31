const { log } = require("console");
const { User } = require("../models");
const { where } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const signupService = async (username, email, password) => {
  // Check if user exists
  const existingUser = await User.findOne({
    where: {
      email: email,
    },
  });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }
  // Password Hash
  const hashPassword = await bcrypt.hash(password, 10);
  // Create User
  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });
  // Return user
  return user;
};

const signinService = async (email, password)=>{
    // Check if user exists
    const user = await User.findOne({
        where: {
            email: email
        }
    });
    if(!user){
        throw new ApiError(400, "Invalid email")
    }
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        throw new ApiError(400, "Invalid password")
    }
    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return { 
        user, token
     };

}

module.exports = {
    signupService,
    signinService
}
