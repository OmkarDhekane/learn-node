import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const verifyJWT = (req,res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.sendStatus(401);

    console.log(authHeader); // Bearer token 

    const token = authHeader.split(" ")[1];
    
    jsonwebtoken.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if( err) return res.sendStatus(403); // invalid token
            req.user = decoded.username;
            next();
        }
    )
}