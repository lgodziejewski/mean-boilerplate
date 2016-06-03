// modules =================================================
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const router = require('./routes');

// configuration ===========================================

// config files
const db = require('./config/db');

const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, '../public');

mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

/* handle errors?
app.use( (err, req, res, next) => {
    // logic
});
*/

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(publicPath));

// routes ==================================================
app.use('/api/v1', router);
app.use('*', (req, res, next) => {
    const arbitraryUrls = ['api'];
    if (arbitraryUrls.indexOf(req.url.split('/')[1]) > -1) {
        next();
    } else {
        res.sendFile('index.html', {root: publicPath});
    }
});

// start app ===============================================
app.listen(port);

console.log('Magic happens on port ' + port);
exports = module.exports = app;
