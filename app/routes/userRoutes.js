const { Router } = require('express')
const userController = require('../controllers/userController')
const route = Router()

route.post('/', userController.store)
route.post('/login', userController.login)

module.exports = route