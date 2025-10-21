// import { fileURLToPath } from 'url'
// import fs from 'fs'
// import path from 'path'


// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// const DATA_PATH = path.join(__dirname, '..',  'model', 'employees.json')
// const data = {
//     employees: JSON.parse(fs.readFileSync(DATA_PATH, 'utf8')),
//     setEmployees: function(data) {this.employees = data}
// };
import { Employee } from "../model/employee.js";


export const getAllEmployees = async (req,res) => {
    const allEmps = await Employee.find()
    if (!allEmps) {
        return res.status(204).json({ "message": "No employees found." });
    }   
    res.json(allEmps);

    // res.json(data.employees);
}
export const getEmployee = async (req,res)=>{
    // const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    
    
    if(!req?.params?.id){
        return res.status(400).json({"message":"Employee ID required"});
    }

    const empId = req.params.id;
    const employee = await Employee.findOne({_id: empId}).exec();

    if(!employee){
        return res.status(204).json({"message": `No Employee matches ${userId}`});
    }

    return res.json(employee);       
}

export const createEmployee = async (req,res) => {

    // const newEmployee = {
    //     "id" :data.employees[data.employees.length - 1].id + 1 || 1,
    //     "firstname": req.body.firstname,
    //     "lastname": req.body.lastname
    // }
    if(!req?.body?.firstname || !req?.body?.lastname){
        return res.status(400).json({"message":"First and Last Names are required"});
    }
    try{

        const { firstname, lastname } = req.body;
        const newEmployee = new Employee({ firstname, lastname });

        const result =  await newEmployee.save();
        
        
        res.status(201).json(result);

    } catch(err){
        console.error(err);
    }


    // data.setEmployees([...data.employees, newEmployee]);


    
}

export const updateEmployee = async (req,res)=> {
//    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    
    if(!req?.body?.id) return res.status(400).json({"message": "Employee ID required"});

    const empId = req.body.id;

    const employee = await Employee.findOne({_id: empId}).exec();

   if(!employee){
        return res.status(204).json({"message": `No Employee matches ${empId}`});
    }

   
    if(req.body?.firstname) employee.firstname = req.body.firstname;
    if(req.body?.lastname) employee.lastname = req.body.lastname;

    // const existingArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    // const unsortedArray = [...existingArray, employee];
    // const sortedArray   = unsortedArray.sort((a,b) => a.id > b.id? 1: a.id < b.id ? -1: 0);
    // data.setEmployees(sortedArray);
    const result = await employee.save();

    res.json(result);


}

export const deleteEmployee = async (req,res) => {
    // const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    
    if(!req?.body?.id) return res.status(400).json({"message": "Employee ID required"});
    
     const empId = req.body.id;

    const employee = await Employee.findOne({_id: empId}).exec();

    if(!employee){
            return res.status(204).json({"message": `No Employee matches ${empId}`});
    }


    // const existingArray = data.employees.filter(emp => emp.id !== parseInt(empId));
    // data.setEmployees([...existingArray])
    const result = await Employee.deleteOne({_id: empId});
    
    res.json(result);
}



