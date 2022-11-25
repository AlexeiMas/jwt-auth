const Router = require('express').Router
const userController = require('../controllers/user-controller')
const router = new Router()
const validateDto = require('../dtos/validate-dto')
const userSchema = require('../validators/schemas/userSchema')
const emailSchema = require('../validators/schemas/emailSchema')
const passwordSchema = require('../validators/schemas/passwordSchema')
const authMiddleware = require('../middlewares/auth-middleware')

router.post('/registration', validateDto(userSchema), userController.registration)
router.post('/login', validateDto(userSchema), userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)
router.post('/forgot-password', validateDto(emailSchema), userController.forgotPassword)
router.post('/password-reset/:userId/:token', validateDto(passwordSchema), userController.resetPassword)

module.exports = router