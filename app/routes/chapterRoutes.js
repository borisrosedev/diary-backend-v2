const { Router } = require('express')
const chapterController = require('../controllers/chapterController')
const { checkIfTokenExists, decodeToken } = require('../middlewares/authMiddlewares')
const route = Router()

route.get('/', [ checkIfTokenExists, decodeToken ], chapterController.index)
route.post('/', chapterController.store)
route.get('/:id', [ checkIfTokenExists, decodeToken ]  , chapterController.getOneById)
route.delete('/:id', [checkIfTokenExists, decodeToken], chapterController.deleteOneById)
module.exports = route