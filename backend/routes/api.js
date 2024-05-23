
const express = require("express");
const router = express.Router()
const multer = require('multer')

//controller
const {register,login,listUser,updateUser,deleteUser,currentUser,verifyUser} = require("../controller/auth")
//Middleware
const {auth,adminCheck} = require("../middleware/auth");



//Endpoints http://localhost:5000/api/register
//Method POST
//Access Public
router.post('/register',register)

//Endpoints http://localhost:5000/api/login
//Method POST
//Access Public
router.post('/login',login)

//Endpoints
//Method GET
//Access Pubic
router.get('/users/:id/verify/:tokens',verifyUser)


//Endpoints http://localhost:5000/api/current-user
//Method POST
//Access Private
router.post('/current-user',auth,currentUser)

//Endpoints http://localhost:5000/api/current-admin
//Method POST
//Access Private
router.post('/current-admin',auth,adminCheck,currentUser)


//Endpoints http://localhost:5000/api/updateUser
//Method POST
//Access Public
router.post('/updateUser',updateUser)

//Endpoints http://localhost:5000/api/auth
//Method DELETE
//Access Public
router.delete('/auth',deleteUser)




module.exports = router