var express = require('express');
// require sequelize so we can check for error types
var Sequelize = require('sequelize');

module.exports = function (Student) {

    var router = express.Router();

    // get all students and return as json
    router.get('/students', function (req, res, next) {
        Student.findAll({order: ['starID']}).then( students => {
            return res.json(students)
        }).catch(err => next(err))
    });

    // create new student with a post route to /students and return 201 status and ok message
    router.post('/students', function (req, res, next) {
        Student.create(req.body).then((data) =>{
            return res.status(201).send('ok')
        }).catch(err =>{
            if (err instanceof Sequelize.ValidationError){
                let messages = err.errors.map((e) => e.message);
                return res.status(500).json(messages)
            }
            return next(err)
        })
    });

    router.patch('/students/:id', function (req, res, next) {
        Student.update(
            req.body, {where:{id: req.params.id}})
        .then((rowsModified)=>{
            if (!rowsModified[0]){
                return res.status(404).send('Not found')
            } else {
                return res.send('ok')
            }
        }).catch(err =>{
            if (err instanceof Sequelize.ValidationError){
                let message = err.errors.map((e) => e.message);
                return res.status(500).json(message)
            }
            return next(err)
        })
    });

    router.delete('/students/:id', function (req, res, next) {
        Student.destroy({where: {id: req.params.id}}).then( rowsModified =>{
            return res.send('ok')
        }).catch(err => next(err))
    });

    return router
};