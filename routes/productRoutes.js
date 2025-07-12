const express = require('express');
const productController = require('../controllers/productController');
const upload = require('../middlewares/multer');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

// post requests
router.post('/create', verifyToken, upload.array('image'), productController.createProduct);

//delete requrest
router.delete('/delete/:productId', verifyToken, productController.deleteProduct);

//put requests 
router.put('/update/:productId', verifyToken, productController.updateProduct);

// get requests
router.get('/get', productController.getProduct);
router.get('/getById/:productId', productController.getProductById);

module.exports = productRoutes = router;