const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true  
    },
    inStock: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrl: {
        type: Array,
        required: true,
    },
    extraDetails:{
        type:Array,
        trim:true
    }

}, {timestamps:true} )

const Product = mongoose.model('products', productSchema);

module.exports = Product;