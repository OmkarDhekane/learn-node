import fs from 'fs'
import fsPromises from 'fs/promises'
import path from 'path'
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

export const handleRefreshToken =  (req, res) => {
    
    const cookies = req.cookies;

    if(!cookies?.jwt) return res.sendStatus(401);

    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    //evaluate user based on refreshtoken
    const foundUser = userDB.users.find((person) => person.refreshToken === refreshToken);
    if(!foundUser) return res.sendStatus(403) //forbidden

    // evaluate jwt

    jsonwebtoken.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
            
            const roles = Object.values(foundUser.roles);
            const accessToken = jsonwebtoken.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s'}
            );
            res.json( { accessToken })
        }   
    )

}
