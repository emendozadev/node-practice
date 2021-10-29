const express = require('express');
const path = require('path');
const expressHbs = require('express-handlebars')
const rootDir = require('./util/path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.engine('hbs', expressHbs({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(rootDir, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000);
