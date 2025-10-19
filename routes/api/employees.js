import express from 'express'
import * as empController from '../../controllers/employeesController.js'
import ROLES_LIST from '../../config/roles_list.js'
import verifyRoles from '../../middleware/verifyRoles.js'

const router = express.Router()


router.route('/')
    .get(empController.getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), empController.createEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), empController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), empController.deleteEmployee);

router.route('/:id')
    .get(empController.getEmployee)
    

export default router