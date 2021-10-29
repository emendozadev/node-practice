const express = require('express');

const router = express.Router();

router.get('/404', (req, res, next) => {
    res.render('404', { pageTitle: 'Page Not Found' });
});

module.exports = router;