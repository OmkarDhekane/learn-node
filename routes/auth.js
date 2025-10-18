import express from 'express'
import * as authController from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.post(/\//, authController.handleLogin);


export default authRouter;