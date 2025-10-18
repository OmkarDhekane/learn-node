import express from 'express'
import * as refreshTokenController from '../controllers/refreshTokenController.js'

const refresherRouter = express.Router()

refresherRouter.get(/\//, refreshTokenController.handleRefreshToken);


export default refresherRouter;