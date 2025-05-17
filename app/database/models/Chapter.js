const { DataTypes, Model } = require('sequelize')
const {  sequelizeClient } = require('../dbConnect')


class Chapter extends Model {}

Chapter.init({
    diaryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Diaries',
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
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }

},{
    sequelize: sequelizeClient,
    tableName: 'Chapters',
})


module.exports = Chapter