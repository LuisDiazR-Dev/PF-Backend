// ----------------------------------------------------
require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env;


// * Import Models
const User = require('./models/User')



// const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`);

const database = new Sequelize({
   dialect: 'postgres',
   host: DB_HOST,
   username: DB_USER,
   password: DB_PASSWORD,
   database: DB_NAME,
   // logging: false,
   // native: false
 })


// * Models executed
User(database)

// * Relaciones
// User.hasMany(Reviews);


database.authenticate()
   .then(() => {
      console.log('Connection has been established successfully.');
   })
   .catch(err => {
      console.error('Unable to connect to the database:', err);
   });


module.exports = { 
         database, 
   ...database.models 
}
