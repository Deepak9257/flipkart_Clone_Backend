const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default:false,
        required: true
    },
}, {timestamps:true})

const emailVerificationModel = mongoose.model('email_is_verified', emailSchema);

module.exports = emailVerificationModel;