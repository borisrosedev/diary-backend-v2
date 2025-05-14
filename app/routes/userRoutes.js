const { Router } = require('express')
const userController = require('../controllers/userController')
const { checkIfTokenExists, decodeToken } = require('../middlewares/authMiddlewares')
const { email, validationResult, password } = require('../middlewares/validatorMiddlewares')
const route = Router()

route.get('/', userController.index)
route.post('/',[password, validationResult], userController.store)
route.post('/login', email, validationResult, userController.login)
route.get('/me', [ checkIfTokenExists, decodeToken ]  , userController.getOneByEmail)
route.delete('/:id', [checkIfTokenExists, decodeToken], userController.deleteOneById)
module.exports = route