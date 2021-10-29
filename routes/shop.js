const express = require('express');
const path = require('path');
const products = require('../data/product');
const route = express.Router();
const rootDir = require('../util/path');

route.get('/', (req, res, next) => {
    res.render('shop', {
        products,
        pageTitle: 'Shop',
        path: req.originalUrl,
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
    });
});

module.exports = route;
