const { User, Diary } = require('../database/models')
const { compareSync } = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const path = require('path')
const { sequelizeClient } = require('../database/dbConnect')
dotenv.config({
    path: path.join(__dirname, '../../.env')
})

const userController = {

    async index(req, res) {

        const { email, role } = req.decodedToken

        if(!(role == "admin" && email == process.env.ADMIN_EMAIL)){
            return res.status(403).json({ message: "restricted access"})
        }

        try {
            const users = await User.findAll()
            return res.status(200).json({ users })
        } catch (err) {
            return res.status(500).json({ err })
        }
    },

    async login(req, res) {
        const { email, password } = req.body

        try {
            const user = await User.findOne({
                where: { email }
            })

            const isPasswordValid = compareSync(password, user.password)

            if(!isPasswordValid){
                return res.status(400).json({ message : "Bad Request" })
            }
           
            const token = jwt.sign({ email, role: user.role }, process.env.TOKEN_PRIVATE_KEY, {
                expiresIn: "1h"
            })

            console.log("😎", token)

            return res.status(200).json({ token })
                 
        } catch (err) {
            return res.status(500).json({ err })
        }
    },

    async store( req, res ){

        const { firstName, lastName, email, password } = req.body

        const t = await sequelizeClient.transaction();

        try {
            const user = await User.create({ firstName, lastName, email, password
            }, {
                transaction: t
            })

            await user.createDiary(
                {
                  title: 'FirstDiary',
                  description: 'Here is the description of your diary',
                  number: 1
                },
                { transaction: t },
            );
            await t.commit();
            return res.status(201).json({ user })


        } catch( err ){
            await t.rollback();
            console.trace( err )
            return res.status(500).json({ err })
        }
    },

    async getOneByEmail(req, res) {
        
        const { decodedToken } = req

        if(!decodedToken){
            return res.status(401).json({ message: "no decoded token get out"})  
        }

        const { email } = decodedToken

        try {

            const user = await User.findOne({
                where: {
                    email: email
                },
                include: [Diary]
            })

            if(!user) {
                return res.status(404).json({ message: "no user found with email " + email})   
            }
  
        
            return res.status(200).json({ user })
        } catch(err) {
        
            return res.status(500).json({ err })
        }
    },

    async deleteOneById(req, res) {

        const { email, role } = req.decodedToken
        const { id } = req.params 

        try {
            const user = await User.findByPk(Number(id))

            if(!user){
                return res.status(404).json({ message: `no user found with id : ${id}`})
            }

            if(!(email == user.email || role == 'admin')) {
                return res.status(400).json({ message : 'bad request'})
            }

            await user.destroy()
            return res.status(200).json({ message : `User with id ${id} has been destroyed`})

        } catch(err) {
            return res.status(500).json({ err })
        }

    },

    async updateOneByEmail(req, res) {

        const { email, role } = req.decodedToken
        const { id } = req.params
        try {

            const user = await User.findByPk(Number(id))
            if(!(email == user.email || role == 'admin')) {
                return res.status(400).json({ message : 'bad request'})
            }

            const updatedUser = await user.update({
                ...req.body
            })

            res.status(200).json({ updatedUser })


        } catch (err){
            return res.status(500).json({ err })
        }
    }

}


module.exports = userController