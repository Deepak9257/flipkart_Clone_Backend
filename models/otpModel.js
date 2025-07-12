const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    expireAt: {
        type: Date,
        required: true,
        expires:0
    },
})

const otpModel = mongoose.model('otps', otpSchema);

module.exports = otpModel;