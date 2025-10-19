import jsonwebtoken from 'jsonwebtoken'

// this is used to protect routes that need authentication
// so when /employees api is called, this middleware will verify the jwt token first. in order to know if it has access to the api at first place
// the token is taken from Authorization header Bearer token (a special type of access key)
export const verifyJWT = (req,res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

    //console.log(authHeader); // Bearer token 

    const token = authHeader.split(" ")[1];
    
    jsonwebtoken.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if( err) return res.sendStatus(403); // invalid token
            req.user = decoded.UserInfo.username; // !important
            req.roles = decoded.UserInfo.roles; // !important
            next();
        }
    )
}