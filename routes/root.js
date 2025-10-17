import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url'

const rootRouter = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

rootRouter.get(/^\/$|\/index(.html)?/, (req, res) => {
    res.sendFile(path.join(__dirname, '..','views','index.html'))
})
rootRouter.get(/\/new-page(.html)?/, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views','new-page.html'))
})
rootRouter.get(/\/old-page(.html)?/, (req, res) => {
    res.redirect(301, '/new-page.html')
})

export default rootRouter