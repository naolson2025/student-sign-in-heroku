module.exports = (sequelize, DataTypes) =>{
    var Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING,
        }, starID: {
            type: DataTypes.STRING,
        }, present: {
            type: DataTypes.BOOLEAN,
        }
    });

    // Creates the student table in the database
    Student.sync({force: true}).then(() =>{
        console.log('synced table')
    });

    return Student
};