
const {signupService, signinService} = require('../services/authServices');
const ApiResponse = require("../utils/ApiResponse");

const signup = async (req, res)=>{
    const {username, email, password} = req.body;
    const user = await signupService(username, email, password);
    return res.status(201).json(
        new ApiResponse(201, "User registered successfully", user)
    );

}

const signin = async (req, res)=>{
    const {email, password} = req.body;
    const user = await signinService(email, password);
    return res.status(200).json(
        new ApiResponse(200, "User signed in successfully", user)
    )

}

module.exports =  {
    signup,
    signin
}