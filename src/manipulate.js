const fs = require('fs')
let obj
let frequente = []
fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data);
    for(let i in obj.data[1]) {
        if(obj.data[1][i].mediaRec <= 1)
    }
}});


// cliente frequente - antes/depois
// cliente gastador - antes/depois
// homens / mulheres