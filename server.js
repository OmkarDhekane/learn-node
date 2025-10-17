import path from 'path';
import express from 'express';
import { logger } from './middleware/logEvents.js'
import  {errorHandler}  from './middleware/errorHandler.js';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3500;

////////////////
// app.use() is what we use to define a middleware.
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
app.use(express.static(path.join(process.cwd(), '/public'))) //built in middleware to serve static files (css, image etc)

////////////////

app.get(/^\/$|\/index(.html)?/, (req, res) => {
    res.sendFile(path.join(process.cwd(), 'views','index.html'))
})
app.get(/\/new-page(.html)?/, (req, res) => {
    res.sendFile(path.join(process.cwd(), 'views','new-page.html'))
})
app.get(/\/old-page(.html)?/, (req, res) => {
    res.redirect(301, '/new-page.html')
})

app.get(/\/hello(.html)?/, (req, res, next) => {
    console.log('attempted to load hello.html');
    next(); // chaining
},(req, res) => {
    res.send('Hello World!');
});

// ///////////////////////// example of chaining
const one = (req, res, next) => {
    console.log('one');
    next();
}
const two = (req, res, next) => {
    console.log('two');
    next();
}
const three = (req, res) => {
    console.log('three');
    res.send('Finished!');
}
app.get(/\/chain(.html)?/, [one, two, three]);
// /////////////////////////

app.all(/\/*/, (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(process.cwd(), 'views','404.html'))
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