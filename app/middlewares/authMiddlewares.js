const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({
    path: path.join(__dirname, '../../.env')
})

module.exports = {

    checkIfTokenExists(req, res, next) {

        const { authorization } = req.headers

        if(!authorization) {
            return res.status(401).json({ message: "no authorisation"})
        }
 
        const token = authorization.split(" ")[1]

        if(!token) {
           return res.status(401).json({ message: "no token"}) 
        }

        req.token = token

        next()
    },

    decodeToken(req, res, next) {
        const { token } = req

        try {
            const decodedToken = jwt.verify(token,process.env.TOKEN_PRIVATE_KEY)
            req.decodedToken = decodedToken
            next()
        } catch (err){
            return res.status(401).json({ message: "no decoded"}) 
        }
       
 

  

    }


}