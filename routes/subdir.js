import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url'

const SubDirRouter = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

SubDirRouter.get(/^\/$|\/index(.html)?/, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views','subdir',  'index.html'));
})

SubDirRouter.get(/\/test(.html)?/, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views','subdir',  'test.html'));
})


export default SubDirRouter;

