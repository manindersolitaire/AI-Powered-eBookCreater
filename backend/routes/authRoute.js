import express from 'express'
import { loginUser, registerUser } from '../controllers/authController.js'
import { protect } from '../middlewares/authMiddleware.js'

const authRoutes =  express.Router()

authRoutes.post('/register', registerUser)
authRoutes.post('/login', loginUser)
// authRoutes.post('/profile', protect ,getProfile)
// authRoutes.post('/register', protect ,updateUserProfile)

export default authRoutes