const { DataTypes, Model } = require('sequelize')
const {  sequelizeClient } = require('../dbConnect')


class Diary extends Model {}

Diary.init({

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const capitalizedTitle = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
            this.setDataValue('title', capitalizedTitle)
        }
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    sequelize: sequelizeClient,
    tableName: 'Diaries',
})



module.exports = Diary