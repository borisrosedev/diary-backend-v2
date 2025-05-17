const { Router } = require('express')
const diaryController = require('../controllers/diaryController')
const { checkIfTokenExists, decodeToken } = require('../middlewares/authMiddlewares')
const route = Router()

route.get('/', [ checkIfTokenExists, decodeToken ], diaryController.index)
route.post('/', diaryController.store)
route.get('/:id', [ checkIfTokenExists, decodeToken ]  , diaryController.getOneById)
route.delete('/:id', [checkIfTokenExists, decodeToken], diaryController.deleteOneById)
module.exports = route