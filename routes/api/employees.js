import express from 'express'
import * as empController from '../../controllers/employeesController.js'

const router = express.Router()


router.route('/')
    .get(empController.getAllEmployees)
    .post(empController.createEmployee)
    .put(empController.updateEmployee)
    .delete(empController.deleteEmployee);

router.route('/:id')
    .get(empController.getEmployee)
    

export default router