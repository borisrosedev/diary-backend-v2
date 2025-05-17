const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')
const { dbConnectionTest } = require('./app/database/dbConnect')
const userRoutes = require('./app/routes/userRoutes')
const diaryRoutes = require('./app/routes/diaryRoutes')
const chapterRoutes = require('./app/routes/chapterRoutes')

dotenv.config({
    path: path.join(__dirname, '.env')
})

dbConnectionTest()

const app = express()

// le serveur connaît de nouveaux formats de corps de requête et de réponse
app.use(express.urlencoded())
app.use(express.json())
app.use(cors())

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/diary', diaryRoutes)
app.use('/api/v1/chapter', chapterRoutes)

//http://localhost:3000/api/v1/user



app.listen(3000, function(){

    console.log(`🚀 Server running on port 3000`)

})