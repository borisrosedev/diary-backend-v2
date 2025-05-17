const { Diary } = require("../database/models")


const DiaryController = {

    async store(req, res) {
        try {
            
        }catch(err){
            
        }
    },

    async deleteOneById(req, res) {

        const { id } = req.params
        try {
           const diaryToDestroy = await Diary.findByPk(Number(id))
           if(!diaryToDestroy){
                return res.status(404).json({ message: `Diary with id ${id} not found`})
           }

           await diaryToDestroy.destroy()
           return res.status(200).json({ message: `Diary with id ${id} destroyed `})
        }catch(err){
            return res.status(500).json({ err })
        }
    }

}


module.exports = DiaryController

