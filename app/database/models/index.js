//Associations
const User = require('./User')
const Diary = require('./Diary')
const Chapter = require('./Chapter')


User.hasMany(Diary, {
   foreignKey: 'userId',
   onDelete: 'CASCADE'
})

Diary.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})

Diary.hasMany(Chapter, {
    foreignKey: 'diaryId',
    onDelete: 'CASCADE'
});
  
Chapter.belongsTo(Diary, {
    foreignKey: 'diaryId',
    onDelete: 'CASCADE'
});



async function syncWithDb() {
    await User.sync({
        force: true
    })

    await Diary.sync({
        force: true
    })

    await Chapter.sync({
        force: true
    })
}

syncWithDb()


module.exports = { User, Diary, Chapter }