const { Chapter } = require("../database/models")
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({
    path: path.join(__dirname, '../../.env')
})

const ChapterController = {

    async updateOneById(req, res){

        const { id } = req.params
        try {
            const chapterToUpdated = await Chapter.findByPk(Number(id))
            if(!chapterToUpdated){
                return res.status(404).json({ message: `chapter  with id ${id} not found`})
            }

            const updatedChapter = await chapterToUpdated.update({
                ...req.body
            })

            return res.status(200).json({ updatedChapter })
        } catch(err){
            return res.status(200).json({ err })
        }
    },

    async getOneById(req, res) {

        const { email, role } = req.decodedToken
        const { id } = req.params
        try {

            const chapter = await Chapter.findByPk(Number(id))
            if(!chapter){
                return res.status(404).json({ message: `chapter with id ${id} not found`})
            }
            res.status(200).json({ chapter })

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
            const chapters = await Chapter.findAll()
            return res.status(200).json({ chapters })
        } catch (err) {
            return res.status(500).json({ err })
        }
    },

    async store(req, res) {

        const { title, description, number, content } = req.body
        try {
            const chapter = await Chapter.create({
                title, description, number, content
            })
            res.status(201).json({ chapter })
        }catch(err){
      
            console.trace( err )
            return res.status(500).json({ err })
        }
    },

    async deleteOneById(req, res) {

        const { id } = req.params
        try {
           const chapterToDestroy = await Chapter.findByPk(Number(id))
           if(!chapterToDestroy){
                return res.status(404).json({ message: `Chapter with id ${id} not found`})
           }

           await chapterToDestroy.destroy()
           return res.status(200).json({ message: `Chapter with id ${id} destroyed `})
        }catch(err){
            return res.status(500).json({ err })
        }
    }

}


module.exports = ChapterController

