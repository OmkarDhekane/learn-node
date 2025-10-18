// Cross-Origin Resource Sharing
const whitelist = [
    'https://www.yoursite.com', 
    'http://127.0.0.1:5500',
    'http://localhost:3500'
];

export const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin)
                if(!origin || whitelist.indexOf(origin) !== -1) {
                    callback(null, true);
                }else{
                    callback(new Error('Not allowed by CORS'))
                }
            },
    optionsSuccessStatus: 200
}


