var express = require('express');

module.exports = function (Student) {

    var router = express.Router();

    // get all students and return as json
    router.get('/students', function (req, res, next) {
        Student.findAll().then( students => {
            return res.json(students)
        })
    });

    // create new student with a post route to /students and return 201 status and ok message
    router.post('/students', function (req, res, next) {
        Student.create(req.body).then((data) =>{
            return res.status(201).send('ok')
        })
    });

    return router
};