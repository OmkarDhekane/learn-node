import { EventEmitter } from 'events'
import http  from 'http'
import path  from 'path'
import fsPromises from 'fs/promises'
import fs from 'fs'
import {fileURLToPath} from 'url';
import { logEvents } from "./logEvents.js";

class Emitter extends EventEmitter {};
const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) =>{ 
    try{

        // handle image
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf8' : '');

        // handle json
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;

        response.writeHead(
            filePath.includes('404.html') ? 404 : 200, 
            {'Content-Type':contentType});
        
            response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data


        );

    }catch(err) {
        console.log(err);
        myEmitter.emit('log',`${err.name}\t${err.message}`, 'errLog.txt');
        response.statusCode = 500;
        response.end();
    }


}

const current_dirname = path.dirname(fileURLToPath(import.meta.url));

//creating server
const server = http.createServer(async (req, res)=> {
    
    myEmitter.emit('log',`${req.url}\t${req.method}`, 'reqLog.txt');

    const extension = path.extname(req.url);
    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        case '.html':
            contentType = 'text/html';
            break;
        default:    
            contentType = 'text/html';
            break;
    }

    let filePath = contentType === 'text/html' && req.url === '/'
        ? path.join(current_dirname, 'views', 'index.html')
        : contentType === 'text/html' && req.url.slice(-1) === '/'
            ? path.join(current_dirname, 'views', req.url, 'index.html')
            : contentType === 'text/html'
                ? path.join(current_dirname, 'views', req.url)
                : path.join(current_dirname, req.url);
    
    if(!extension && req.url.slice(-1) !== '/') filePath += '.html';

    const fileExists = fs.existsSync(filePath);

    if(fileExists){
        //serve the file
        serveFile(filePath, contentType, res);
    } else {
        //404 - file not found
        // 301 - redirect
        const base = path.parse(filePath).base;
        switch (base) {
            case 'old-page.html':
                res.writeHead(301, {'Location': '/new-page.html'});
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, {'Location': '/'});
                res.end();
                break;
            default:
                //404
                serveFile(path.join(current_dirname, 'views', '404.html'), 'text/html', res);

        }

    }

});


server.listen(PORT, () => console.log(`server running on PORT = ${PORT}`))

