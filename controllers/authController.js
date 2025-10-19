import fs from 'fs'
import fsPromises from 'fs/promises'
import path from 'path'
import bcrypt from 'bcrypt'
import { fileURLToPath } from 'url'

import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const USER_DATAPATH = path.join(__dirname, '..',  'model', 'users.json')
 
const users_raw = fs.readFileSync(USER_DATAPATH)
const userDB = {
    users : JSON.parse(users_raw),
    setUsers : function(data) { this.users =  data}    
}

export const handleLogin = async (req, res) => {
    const  { user, password }  = req.body;
    if(!user || !password) return res.status(400).json({"message":"user and Password are required"});

    //evaluate user
    const foundUser = userDB.users.find((person) => person.username === user);
    if(!foundUser) return res.status(401).json({ "message": "Unauthorized" }); //401 Unauthorized

    //evaluate pass
    const match = await bcrypt.compare(password, foundUser.password);

    if(match){

        const roles = Object.values(foundUser.roles);

        // create JWT
        const accessToken = jsonwebtoken.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        );
        const refreshToken = jsonwebtoken.sign(
            {'username': foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
        // save refresh token to db for logout feature of current user
        const otherUser = userDB.users.filter(person => person.username !== foundUser.username)
        const currentUser = { ...foundUser, refreshToken};
        userDB.setUsers([...otherUser, currentUser])
        await fsPromises.writeFile(
            path.join(__dirname, '..','model','users.json'),
            JSON.stringify(userDB.users)
        )

        // need to send refreshToken to user?
        // set at cookie with httpOnly option

        res.cookie('jwt',refreshToken, {
            httpOnly: true, 
            sameSite:'None', 
            secure: true, 
            maxAge: 24*60*60*1000
        });
        
        res.json({accessToken});
    }
    else{
        res.sendStatus(401);
    }


}
