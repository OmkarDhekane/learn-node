// const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');


const filOps = async () => {
    try{
        const data = await fsPromises.readFile(path.join(__dirname,'myfiles','lorem.txt'), 'utf8')
        console.log(`[original content from lorem.txt]: ${data}`);
        await fsPromises.unlink(path.join(__dirname,'myfiles','lorem.txt'));

        await fsPromises.writeFile(path.join(__dirname,'myfiles','promiseWrite.txt'), data);

        await fsPromises.appendFile(path.join(__dirname,'myfiles','promiseWrite.txt'), "\n\nNice to meet you, appended!");

        await fsPromises.rename(path.join(__dirname,'myfiles','promiseWrite.txt'), path.join(__dirname,'myfiles','promiseWriteComplete.txt'));


        const newData = await fsPromises.readFile(path.join(__dirname,'myfiles','promiseWriteComplete.txt'), 'utf8')
        console.log(newData);
    }catch(err){
        console.log(err)
    }
}
filOps()

// //////////////////// reading from file
// fs.readFile(path.join(__dirname, 'myfiles','lorem.txt'), 'utf8',(err,data) => {
//     if(err) throw err;
//     console.log(data);
// })
// console.log('Hello...')


// //////////////////////// writing to file
// fs.writeFile(path.join(__dirname, 'myfiles','lorem2.txt'), 'Nice to meet you' ,(err) => {
//     if(err) throw err;
//     console.log('write complete');

//     fs.appendFile(path.join(__dirname, 'myfiles','lorem2.txt'), '\n\nTesting TEST APPEND' ,(err) => {
//         if(err) throw err;
//         console.log('Append complete');
        
//         fs.readFile(path.join(__dirname, 'myfiles','lorem2.txt'), 'utf8',(err,data) => {
//             if(err) throw err;
//             console.log('read complete')
//             console.log(data);
//         })

//     })

// })


process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err} `)
    process.exit(1);
})