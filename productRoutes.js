const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
} = require('./productService');

router.get('/', (req, res) => {
    const products = getProducts();
    res.json(products);
});

router.get('/:id', (req, res) => {
    const productId = req.params.id;
    const product = getProductById(productId);
    if (!product) {
        res.status(404).send(`Product with ID ${productId} not found.`);
        return;
    }
    res.json(product);
});

router.post('/', (req, res) => {
    const product = req.body;
    if (!product || !product.name || !product.price) {
        res.status(400).send('Product is not valid.');
        return;
    }
    const newProduct = addProduct(product);
    res.status(200).json(newProduct);
});

router.put('/:id', (req, res) => {
    const productId = req.params.id;
    const productData = req.body;
    const updatedProduct = updateProduct(productId, productData);
    if (!updatedProduct) {
        res.status(404).send(`Product with ID ${productId} not found.`);
        return;
    }
    res.json(updatedProduct);
});

router.delete('/:id', (req, res) => {
    const productId = req.params.id;
    const deletedProductId = deleteProduct(productId);
    if (!deletedProductId) {
        res.status(404).send(`Product with ID ${productId} not found.`);
        return;
    } else {
        res.json({ message: `Product with ID ${productId} deleted` });
    }
    
});

module.exports = router;