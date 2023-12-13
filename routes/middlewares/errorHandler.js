const { sendResponse } = require("../../utils/response");
const httpStatus = require("http-status");

const urlNotFound = (req, res, next) => {
    sendResponse(res,"Api url not found.", httpStatus.BAD_REQUEST);
    next();
}

module.exports = {
    urlNotFound,
};