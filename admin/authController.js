const MyError = require("../helpers/error");
const { sendRes } = require("../helpers/response");
const { generateJwt } = require("../helpers/token");
const { wrapAllAsync } = require("../helpers/wrapAsync");
const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');


const authController = {

    async login(req, res) {

        const { email, password } = req.body;

        const exist = await userModel.findOne({ email, role: 'admin' });
        if (!exist) throw new MyError(400, "Invalid Email or Password");

        const compare = await bcrypt.compare(password, exist.password);
        if (!compare) throw new MyError(400, "Invalid Email or Password");

        const token = generateJwt(exist);

        res.cookie("token", token, {
            httpOnly: true,
        });

        return sendRes(res, 200, "user logined successfully")
    },

    async logout(req, res) {
        const id = req?.user?.id;
        
        if (!id) throw new MyError(400, "Unauthorized action");

        res.clearCookie('token', {
            httpOnly: true,
        });

        return sendRes(res, 200, "Logout Successfully")
    }
}
module.exports = wrapAllAsync(authController)