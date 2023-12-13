const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { sendResponse } = require("../../utils/response");

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } = httpStatus;

const addUser = async (req, res) => {
    let {
        username,
        email,
        password,
    } = req.body;
    try {

        if (!username) sendResponse(res, "Username is missing.", BAD_REQUEST);
        else if (!email) sendResponse(res, "Email is missing.", BAD_REQUEST);
        else if (!password) sendResponse(res, "Password is missing.", BAD_REQUEST);
        else {
            const userExist = await User.findOne({ email });
            if (userExist) sendResponse(res, "User already exist.", BAD_REQUEST);
            else {
                const saltRounds = 12;
                const hashPassword = bcrypt.hashSync(password, saltRounds);
                const user = await User.create({
                    username,
                    email,
                    password : hashPassword
                });
                if (user) {
                    sendResponse(res, user, OK);
                }
            }
        }
    } catch (err) {
        sendResponse(res, err.message, INTERNAL_SERVER_ERROR);
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email) sendResponse(res, "Email is missing.", BAD_REQUEST);
        else if (!password) sendResponse(res, "Password is missing.", BAD_REQUEST);
        else {
            const user = await User.findOne(
                { email },
                "_id email username password");

            if (!user) sendResponse(res, "Invalid credentials.", BAD_REQUEST);
            else {
                const isValidPassword = bcrypt.compareSync(password, user.password);
                if (!isValidPassword) sendResponse(res, "Invalid credentials.", BAD_REQUEST);
                else {
                    const payload = {
                        id: user._id,
                    };

                    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "30d" });
                    const data = {
                        token,
                        id: user._id,
                        name: user.username,
                    }
                    sendResponse(res, data, OK);
                }
            }
        }
    } catch (err) {
        sendResponse(res, err.message, INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    addUser,
    userLogin
}


