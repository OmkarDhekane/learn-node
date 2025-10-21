// import path from 'path'
// import fs from 'fs'
// import fsPromises from 'fs/promises'
// import { fileURLToPath } from 'url'
import { User } from '../model/user.js'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// const USER_DATAPATH = path.join(__dirname, '..',  'model', 'users.json') 
// const users_raw = fs.readFileSync(USER_DATAPATH)
// const usersDB = {
//     users : JSON.parse(users_raw),
//     setUsers : function(data) { this.users =  data}    
// }


export const handleLogout =  async (req, res) => {
    
    // on client, also delete access token


    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;


    // is refreshToken in db?

    //evaluate user based on refreshtoken
    const foundUser = await User.findOne({refreshToken}).exec();

    // const foundUser = usersDB.users.find((person) => person.refreshToken === refreshToken);
    if(!foundUser) {

        res.clearCookie('jwt',{httpOnly: true, 
            sameSite:'None', 
            secure: true
        });
        return res.sendStatus(204); // success but no content

        
    }

    //delete refresh token

    // find all except current one
    // const otherUsers = usersDB.users.filter((person) => [person.refreshToken !== foundUser.refreshToken]);
    // const currentUser = {...foundUser, refreshToken: ''}; //updated current user 
    // usersDB.setUsers([...otherUsers, currentUser]); // merge current with others
    // await fsPromises.writeFile(USER_DATAPATH, JSON.stringify(usersDB.users));

    foundUser.refreshToken = '';
    const result =  await foundUser.save();
    console.log(result);


    res.clearCookie('jwt',{httpOnly: true, 
            sameSite:'None', 
            secure: true
            }); // in production, we add secure: true to also be compatible with 'https'

    res.sendStatus(204);
}
