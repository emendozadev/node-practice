const express = require('express');
const path = require('path');
const router = express.Router();
const product = require('../data/product');
const rootDir = require('../util/path');

router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: req.originalUrl,
        activeAddProduct: true,
        formCss: true,
        productCss: true,
    });
});

router.post('/add-product', (req, res, next) => {
    const { title } = req.body;
    product.push({ title: title });
    res.redirect('/');
});

module.exports = router;
