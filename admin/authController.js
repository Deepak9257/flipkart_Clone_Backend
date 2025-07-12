const MyError = require("../helpers/error");
const { sendRes } = require("../helpers/response");
const { generateJwt } = require("../helpers/token");
const { wrapAllAsync } = require("../helpers/wrapAsync");
const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const crypto = require("crypto")

const authController = {

    async login(req,res){

        const {email, password} = req.body;

        const exist = await userModel.findOne({email, role:'admin'});
        if(!exist) throw new MyError(400,"Invalid Email or Password");

        const compare = await bcrypt.compare(password,exist.password);
        if(!compare) throw new MyError(400,"Invalid Email or Password");

        const token = generateJwt(exist);

        res.cookie("token",token,{
            secure:true,
            sameSite:'strict',
            httpOnly:true
        });

        const csrfToken = generateJwt(crypto.randomBytes(32).toString('base64url'));

        res.cookie("X-csrf-token", csrfToken,{
            httpOnly:false,
            sameSite:'strict',
            secure:true
        })

        return sendRes(res,200,"user logined successfully")
    }
}
module.exports = wrapAllAsync(authController)