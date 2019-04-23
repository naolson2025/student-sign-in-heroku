var express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var api_routes = require('./routes/api.js');

// Database configuration
sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite3'
});

// Verify Connection to database
sequelize.authenticate()
    .then(() => console.log('connected to sqlite'))
    .catch(err => console.log('error connecting', err));

// initialize student model
let student = require('./model/student.js')(sequelize, Sequelize);

// app config
var app = express();
app.use(bodyParser.json());

app.use('/api', api_routes(student));

// Error handlers - for route not found
app.use(function (req, res, next) {
    res.status(404).send('Not found')
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Server Error')
});

// Start server running
var server = app.listen(process.env.PORT || 3000, function () {
    console.log('app running on port', server.address().port)
});