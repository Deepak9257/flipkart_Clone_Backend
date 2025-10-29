
const jwt = require("jsonwebtoken");
const MyError = require("../helpers/error");
const { wrapAsync } = require("../helpers/wrapAsync");

const verifyToken = wrapAsync((req, res, next) => {

    if (!req.cookies['token']) throw new MyError(400, "Unauthorized-NO TOKEN!")

    const token = req.cookies['token'];

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (!decoded) throw new MyError(401, "Unauthorized-Invalid TOKEN");

    req.user = decoded;
    next();

})

module.exports = verifyToken;