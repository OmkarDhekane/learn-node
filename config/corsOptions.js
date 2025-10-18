// Cross-Origin Resource Sharing
import allowedOrigins from './allowedOrigins.js'

export const corsOptions = {
    origin: (origin, callback) => {
        if(!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}


