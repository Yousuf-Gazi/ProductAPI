const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'products.json');

const getProducts = () => {
    const rawData = fs.readFileSync(DATA_FILE);
    const products = JSON.parse(rawData);
    return Array.isArray(products) ? products : [];
};

const getProductById = (productId) => {
    const products = getProducts();
    return products.find(product => product.id === productId);
};

const addProduct = (product) => {
    const products = getProducts();
    product.id = `PROD-${Math.random().toString(36).substr(2, 10)}`;
    products.push(product);
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
    return product;
};

const updateProduct = (productId, productData) => {
    const products = getProducts();
    const productIndex = products.findIndex(product => product.id === productId);
    if (productIndex === -1) {
        return null;
    }
    products[productIndex] = {
        ...products[productIndex],
        ...productData
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
    return products[productIndex];
};

const deleteProduct = (productId) => {
    const products = getProducts();
    const newProducts = products.filter(product => product.id !== productId);
    if (newProducts.length === products.length) {
        return null;
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(newProducts, null, 2));
    return productId;
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
};