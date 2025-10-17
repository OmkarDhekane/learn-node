import path from 'path';
import cors from 'cors';
import express from 'express';
import { fileURLToPath } from 'url';

import { logger } from './middleware/logEvents.js'
import  {errorHandler}  from './middleware/errorHandler.js';

import subdirRouter from './routes/subdir.js';
import rootRouter from './routes/root.js';

import employeeApi from './routes/api/employees.js'


const app = express();
const PORT = process.env.PORT || 3500;
const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)




// app.use() is what we use to define a middleware.
////////////////
// custom middleware
app.use(logger);
////////////////
// third party middleware

// Cross-Origin Resource Sharing
const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500','http://localhost:3500']
const corsOptions = {
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
app.use(cors(corsOptions));

////////////////
// built in middlewares
app.use(express.urlencoded({extended: false})); //built in middleware to handle urlencoded data
app.use(express.json()) //built-in middleware for json

const staticFileHandler = express.static(path.join(__dirname, '/public')) //path to static files
app.use('/',staticFileHandler) //built in middleware to serve static files (css, image etc)
app.use('/subdir',staticFileHandler) //built in middleware to serve static files (css, image etc)


//////////////// 
// Routes
app.use('/', rootRouter);
app.use('/subdir', subdirRouter);

// api routes
app.use('/employees', employeeApi);



// ///////////////////////// example of chaining

// app.get(/\/hello(.html)?/, (req, res, next) => {
//     console.log('attempted to load hello.html');
//     next(); // chaining
// },(req, res) => {
//     res.send('Hello World!');
// });

// const one = (req, res, next) => {
//     console.log('one');
//     next();
// }
// const two = (req, res, next) => {
//     console.log('two');
//     next();
// }
// const three = (req, res) => {
//     console.log('three');
//     res.send('Finished!');
// }
// app.get(/\/chain(.html)?/, [one, two, three]);
// /////////////////////////


// Handle any path that has not been handled by previous routes
app.all(/\/*/, (req, res) => {
    res.status(404);

    //this is called content negotiation to respond wih different formats based on what the client accepts
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views','404.html'))
    }
    else if(req.accepts('json')){
        res.json({error: "404 Not Found"})
    }else{
        res.type('txt').send('404 Not Found')
    }
});

// another example of customer middleware
app.use(errorHandler)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));