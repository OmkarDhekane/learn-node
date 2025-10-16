const fs = require('fs');

const rs = fs.createReadStream('./myfiles/lorem.txt', {encoding:'utf8'});

const ws = fs.createWriteStream('./myfiles/newlong-lorem.txt');


// rs.on('data',(datachunk) => {
//     ws.write(datachunk);
// })

//or better way to do this is:
rs.pipe(ws);
