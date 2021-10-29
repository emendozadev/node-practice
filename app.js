const express = require('express');
const path = require('path');
const rootDir = require('./util/path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(rootDir, 'public')));

app.use(shopRoutes);
app.use('/admin', adminRoutes);
app.use('/error', errorRoutes);

app.use((req, res, next) => {
    res.status(404).redirect('/error/404');
    // res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000);
