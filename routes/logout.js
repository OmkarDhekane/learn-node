import express from 'express'
import * as logoutController from '../controllers/logoutController.js'

const logoutRouter = express.Router()

logoutRouter.get(/\//, logoutController.handleLogout);


export default logoutRouter;