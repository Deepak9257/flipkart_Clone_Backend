const uploadToCloud = require("../helpers/cloudinary");
const MyError = require("../helpers/error");
const { sendRes } = require("../helpers/response");
const { wrapAllAsync } = require("../helpers/wrapAsync");
const Product = require("../models/productModel");

 
const productController = {

    async createProduct(req, res) {

        const fileArray = req.files;

        if (fileArray && fileArray.length === 0) throw new MyError(400, "Please upload images.");

        const filePath = fileArray.map(item => item.path);

        const { name, price, description, inStock, category } = req.body;
        
        if (!name || !price || !description || !inStock || !category) throw new MyError(400, "Please fill all the required fields.") 

        const exist = Product.findOne({name});
        if(!exist)throw new MyError(400,"Product already exists")


        const imageUrl = await uploadToCloud(filePath);

        console.log(imageUrl)

        await Product.create({name, price, description, inStock, category, imageUrl});

        return sendRes(res, 200, "Product added successfully");
    },

    async deleteProduct(req, res) {

        const id = req.params.productId;
        const exist = await Product.findByIdAndDelete(id);

        if (!exist) throw new MyError(400, "Product not exists");

        return sendRes(res, 200, "Product deleted successfully");

    },

    async updateProduct(req, res) {

        const id = req.params.productId;
        const { name, price, description, inStock, category } = req.body;

        const exist = await Product.findByIdAndUpdate(id, { name, price, description, inStock, category });

        if (!exist) throw new MyError(400, 'Product not found');

        return sendRes(res, 200, 'Product updated successfully')

    },

    async getProduct(req, res) {

        const product = await Product.find({});

        console.log(product)

        sendRes(res, 200, "Data fetched successfully", product)
    },

    async getProductById(req, res) {

        const id = req.params.productId;

        const product = await Product.findById(id);
        if (!product) throw new MyError(400, "Product does not exists.")

        sendRes(res, 200, "Data fetched successfully", product)
    }


}

module.exports = wrapAllAsync(productController);