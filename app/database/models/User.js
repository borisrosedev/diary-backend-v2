const { Model, DataTypes, ENUM } = require('sequelize')
const { hashSync } = require('bcrypt')
const { sequelizeClient } = require('../dbConnect')

class User extends Model {}
User.init({

    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(plain) {
            this.setDataValue('password', hashSync(plain, 10))
        }
    },   
    role: {
       type: DataTypes.ENUM(["user", "admin"]), 
       allowNull: false,
       defaultValue: "user"
    }
},{

    sequelize:sequelizeClient,
    tableName: 'Users'

})


module.exports = User


//console.log(User == sequelizeClient.models.User)

/* 
async function syncUserWithDb() {
    await User.sync({
        alter: true
    })
}

syncUserWithDb()
 */