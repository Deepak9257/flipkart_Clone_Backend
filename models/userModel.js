const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique:true
    },

    role:{
        type:String,
        enum:['user', 'admin'],
        default:'user'
    },

    password: {
        type: String,
        required: true
    },

    mobileNumber: {
        type: String,
    },

    address: {
        type: String,

    },

    isActive: {
        type: Boolean,
        default:true

    },
},{
    timestamps:true
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;