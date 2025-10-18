import fs from 'fs'
import fsPromises from 'fs/promises'
import path from 'path'
import bcrypt from 'bcrypt'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const USER_DATAPATH = path.join(__dirname, '..',  'model', 'users.json')
 
const users_raw = fs.readFileSync(USER_DATAPATH)
const userDB = {
    users : JSON.parse(users_raw),
    setUsers : function(data) { this.users =  data}    
}


export const handleNewUser = async (req, res) => {
    const  { user, password }  = req.body;

    if(!user || !password) return res.status(400).json({"message":"user and Password are required"})
        
    const  duplicate = userDB.users.find((person) => person.username === user);
    
    if(duplicate) return res.status(409).json({ message: 'Username already exists' });

    try{
        // hash password
        const hashPwd = await bcrypt.hash(password, 10);
        
        //store new user (in memory)
        const newUser = {'username':user, password: hashPwd};
        userDB.setUsers([...userDB.users, newUser]);


        //write to db/ overwrite the whole json
        await fsPromises.writeFile(
            path.join(__dirname, '..','model','users.json'),
            JSON.stringify(userDB.users)
        );
        console.log(userDB.users);
        res.status(201).json({"success":`New user ${user} created!`});

    }catch(err){
        res.status(500).json({'message': err.message});
    }
}