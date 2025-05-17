const { Model, DataTypes } = require('sequelize')
const { hashSync } = require('bcrypt')
const { sequelizeClient } = require('../dbConnect')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({
    path: path.join(__dirname, '../../../.env')
})


class User extends Model {}
User.init({

    firstName: {
        type: DataTypes.STRING,
        allowNull: false,  
        set(value) {
            const capitalizedTitle = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
            this.setDataValue('firstName', capitalizedTitle)
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const capitalizedTitle = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
            this.setDataValue('lastName', capitalizedTitle)
        }
    },
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
            throw new Error('Do not try to set the `fullName` value!');
        },
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            checkAdmin(value) {
              if (value == process.env.ADMIN_EMAIL) {
                console.log('🎾 admin email detected')
              }
            },
        },
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
    tableName: 'Users',
    hooks: {
        beforeCreate(user, options){
            if(user.email == process.env.ADMIN_EMAIL){
                user.role = "admin"
            }
        }
    }

})

console.log("User is a SQUELIZE CLIENT MODEL ?", User == sequelizeClient.models.User)

module.exports = User




