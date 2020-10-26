const express =  require('express')
const router = express.Router()
const userController =  require('../controllers/user')


router.get("/getUserDetails",userController.getUserDetails)
router.get("/numberOfUsers",userController.getNumberofUsers)


module.exports =router; 