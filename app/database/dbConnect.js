const { Sequelize } = require('sequelize');
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({
    path: path.join(__dirname, '../../.env')
})

const sequelizeClient = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, 
{
  host: process.env.DB_HOSTNAME,
  dialect: process.env.DB_DIALECT,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  },
});


async function dbConnectionTest() {

    try {

        await sequelizeClient.authenticate()
        console.log(`✅Connection succeeded`)

    } catch (err) {
        console.trace(err)
        console.log(`❌Error while trying to connect to the db`)
    }
}


module.exports = {
    dbConnectionTest,
    sequelizeClient
}
