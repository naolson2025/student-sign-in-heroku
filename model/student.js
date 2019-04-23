module.exports = (sequelize, DataTypes) =>{

    // to create a student they need name, starID, and a present value
    var Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }, starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }, present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    // Creates the student table in the database
    // force false prevents tables from being dropped and re-created when app re-starts
    Student.sync({force: false}).then(() =>{
        console.log('synced table')
    });

    return Student
};