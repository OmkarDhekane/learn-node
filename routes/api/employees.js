import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url'
import fs from 'fs'

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const employeesData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'employees.json'), 'utf8')
)

const data = {};
data.employees = employeesData


router.route('/')
    .get((req,res) => {
        res.json(data.employees)
    })
    .post((req,res) => {
        // req.body.param
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        });
    })
    .put((req,res)=> {
        res.json({
                "firstname": req.body.firstname,
                "lastname": req.body.lastname
        });
    })
    .delete((req,res) => {
        res.json({ "id":req.body.id });
    });

router.route('/:id')
    .get((req,res)=>{
        res.json({"id":req.params.id});
    })
    

export default router