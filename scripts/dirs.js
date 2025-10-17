const fs = require('fs');

if(!fs.existsSync('./new')){
    fs.mkdir('./new',(err) => {
        if(err) throw err;
        console.log("Directory Created!");
    })
}else{
    console.log("Directory name already exists! deleting...")
    fs.rmdir('./new',(err) => {
            if(err) throw err;
            console.log("Directory removed!");
    })
}