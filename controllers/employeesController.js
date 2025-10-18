import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_PATH = path.join(__dirname, '..',  'model', 'employees.json')
const data = {
    employees: JSON.parse(fs.readFileSync(DATA_PATH, 'utf8')),
    setEmployees: function(data) {this.employees = data}
};


export const getAllEmployees = (req,res) => {
    res.json(data.employees);
}
export const getEmployee = (req,res)=>{
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    
    if(!employee){
        return res.status(400).json({"message": `Employee ID ${req.params.id} not found`});
    }

    return res.json(employee);       
}

export const createEmployee = (req,res) => {

    const newEmployee = {
        "id" :data.employees[data.employees.length - 1].id + 1 || 1,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    }

    if(!newEmployee.firstname || !newEmployee.lastname){
        return res.status(400).json({"message":"First and Last Names are required"});
    }

    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
}

export const updateEmployee = (req,res)=> {
   const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));

   if(!employee){
        return res.status(400).json({"message": `Employee ID ${req.body.id} not found`});
    }
   
    if(req.body.firstname) employee.firstname = req.body.firstname;
    if(req.body.lastname) employee.lastname = req.body.lastname;

    const existingArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...existingArray, employee];
    const sortedArray   = unsortedArray.sort((a,b) => a.id > b.id? 1: a.id < b.id ? -1: 0);

    data.setEmployees(sortedArray);
    res.json(data.employees);


}

export const deleteEmployee = (req,res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));

   if(!employee){
        return res.status(400).json({"message": `Employee ID ${req.body.id} not found`});
    }
    const existingArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    
    data.setEmployees([...existingArray])
    res.json(data.employees);
}



