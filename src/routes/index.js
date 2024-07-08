const router = require('express').Router()


// * Controllers imports
const allUser = require ('../controllers/allUser.js')





// * Rutas

//------------------Get
router.get('/users', allUser )


//------------------Post



module.exports = router;