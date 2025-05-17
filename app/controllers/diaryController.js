const { sequelizeClient } = require("../database/dbConnect")
const { Diary } = require("../database/models")
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({
    path: path.join(__dirname, '../../.env')
})

const DiaryController = {

    async updateOneById(req, res){

        const { id } = req.params
        try {
            const diaryToUpdated = await Diary.findByPk(Number(id))
            if(!diaryToUpdated){
                return res.status(404).json({ message: `diary  with id ${id} not found`})
            }

            const updatedDiary = await diaryToUpdated.update({
                ...req.body
            })

            return res.status(200).json({ updatedDiary })
        } catch(err){
            return res.status(200).json({ err })
        }
    },

    async getOneById(req, res) {

        const { email, role } = req.decodedToken
        const { id } = req.params
        try {

            const diary = await Diary.findByPk(Number(id))
            if(!diary){
                return res.status(404).json({ message: `diary with id ${id} not found`})
            }
            res.status(200).json({ diary })

            return res.status(200).json({ })
        } catch(err){
            return res.status(500).json({ err })
        }
    },

    async index(req, res){

        const { email, role } = req.decodedToken

        if(!(role == "admin" && email == process.env.ADMIN_EMAIL)) {
            return res.status(403).json({ message: "access restricted"})
        }

        try {    
            const diaries = await Diary.findAll({})
            return res.status(200).json({ diaries })

        } catch (err) {
            return res.status(500).json({ err })
        }
    },

    async store(req, res) {

        const { title, description, number } = req.body
        const t = await sequelizeClient.transaction()
        try {
            const diary = await Diary.create({
                title, description, number
            }, { 
                transaction: t
            })

            await diary.addChapter({
                title: "DefaultChapter",
                description: "Here is the description of the default chapter",
                content: "Here is the content of the default chapter",
                number: 1
            }, {
                transaction: t
            })

            await t.commit();
            res.status(201).json({ diary })
        }catch(err){
      
            await t.rollback();
            console.trace( err )
            return res.status(500).json({ err })
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

