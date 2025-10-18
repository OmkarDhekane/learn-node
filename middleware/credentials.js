import allowedOrigins from "../config/allowedOrigins.js";

export const credentials = (req,res, next) => {
    const origin = req.headers.origin; // maybe from frontend
    if(allowedOrigins.includes(origin)){
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();

}