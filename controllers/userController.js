const { sendRes } = require("../helpers/response");
const bcrypt = require("bcrypt")
const crypto = require('crypto')
const userModel = require("../models/userModel");
const { generateJwt } = require("../helpers/token");
const { generateOtp } = require("../helpers/otp");
const sendMail = require("../helpers/mail");
const otpModel = require("../models/otpModel");
const emailVerificationModel = require("../models/emailVerificationModel");
const { wrapAllAsync } = require("../helpers/wrapAsync");
const MyError = require("../helpers/error");
const jwt = require("jsonwebtoken");
const emailTemplate = require("../helpers/emailTemplate");

const userController = {

        async createUser(req, res) {

                const { email, password, name, address, mobileNumber } = req.body;

                const user = await userModel.findOne({ email });

                if (user) throw new MyError(400, "user already exists");

                const isEmailVerified = await otpModel.findOne({ email });
                if (!isEmailVerified) throw new MyError(400, "Please verify your email")

                const hashPswrd = await bcrypt.hash(password, 10);

                await userModel.create({ email, password: hashPswrd, name, address, mobileNumber });

                return sendRes(res, 200, "user created successfully")


        },

        async loginUser(req, res) {

                const { email, password } = req.body;

                const user = await userModel.findOne({ email });
                if (!user) throw new MyError(401, "Invalid username or password");

                const compare = await bcrypt.compare(password, user.password);
                if (!compare) throw new MyError(401, "Invalid username or password");

                const token = generateJwt(user);

                res.cookie('token', token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'strict'
                })

                const csrfToken = generateJwt(crypto.randomBytes(32).toString('base64url'))

                res.cookie('X-csrf-token', csrfToken, {
                        httpOnly: false,
                        secure: true,
                        sameSite: 'strict'
                })

                return sendRes(res, 200, "user logined successfully")


        },

        async updateUser(req, res) {

                const id = req?.user?.id;
                if (!id) throw new MyError(401, "Unauthorized");

                const { name, email, password, address, mobileNumber } = req.body;

                const exist = await userModel.findOne({ email });
                if (exist) throw new MyError(401, "user already exits");

                await userModel.findByIdAndUpdate(id, { name, email, password, address, mobileNumber });

                return sendRes(res, 201, "user updated successfully")


        },

        async deleteUser(req, res) {

                const id = req?.user?.id;
                if (!id) throw new MyError(401, "Unauthorized")

                // await userModel.findByIdAndDelete(id);

                return sendRes(res, 201, "user deleted successfully")


        },

        async sendOtp(req, res) {

                const { email } = req.body;

                const user = await userModel.findOne({ email });

                if (user) throw new MyError(400, "User already exits.");

                const otp = generateOtp();

                await otpModel.findOneAndUpdate({ email }, { otp, email, expireAt: new Date(Date.now() + 5 * 60 * 1000) }, { upsert: true })

                await sendMail(email, "Your verification code", `<h1>Your OTP is <br/> ${otp} </h1>`);

                return sendRes(res, 201, "otp sent successfully");


        },

        async verifyOtp(req, res) {

                const { otp, email } = req.body;

                const user = await otpModel.findOne({ email });
                if (!user) throw new MyError(400, "session expired");

                if (otp !== user.otp) throw new MyError(400, "session expired");

                if (new Date() > user.expireAt) throw new MyError(400, "session expired");

                await emailVerificationModel.create({ email, isVerified: true });

                return sendRes(res, 200, "otp verified");


        },

        async logoutUser(req, res) {

                const id = req?.user?.id;

                if (!id) throw new MyError(400, "Unathorized-User");

                res.clearCookie('token', {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'strict'
                });
                        
                res.clearCookie('X-csrf-token', {
                        secure: true,
                        sameSite: 'strict'
                })

                sendRes(res, 200, "Logout Successfully")


        },

        async forgotPassword(req, res) {

                const { email } = req.body;

                const user = await userModel.findOne({ email });

                if (!user) throw new MyError(400, "Invalid email");

                const token = generateJwt(user);

                 const emailTemp= emailTemplate(token)

                sendMail(email, "Your password reset link.", emailTemp)

                sendRes(res, 200, "Email sent successfully")


        },

        async resetPassword(req, res) {

                const token = req.params.token;

                const decoded = jwt.verify(token, process.env.JWT_KEY);

                const { email, password, confirmPassword } = req.body;

                if(!email || !password || !confirmPassword) throw new MyError(400, 'Please fill all the required details.')

                const user = await userModel.findOne({ _id:decoded.id, email });

                if (!user) throw new MyError(400, "Invalid email");
                if (password !== confirmPassword) throw new MyError(400, "Please enter exact same password in both fields.")

                sendRes(res, 200, "Password reset successfully")
               
               


        }
}

module.exports = wrapAllAsync(userController);