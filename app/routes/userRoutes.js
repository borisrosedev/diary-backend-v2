const { Router } = require('express')
const userController = require('../controllers/userController')
const { checkIfTokenExists, decodeToken } = require('../middlewares/authMiddlewares')
const route = Router()

route.post('/', userController.store)
route.post('/login', userController.login)
route.get('/me', [ checkIfTokenExists, decodeToken ]  , userController.getOneByEmail)
module.exports = route