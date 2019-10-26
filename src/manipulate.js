const fs = require('fs')
let obj
let frequenteAntes = []
let gastadorAntes = []
let frequenteDepois = []
let gastadorDepois = []
let mulheres = []
let homens = []

function sequencial(qtd, arr) {
    let i = 0
    let found
    //console.log(Object.values(arr)[0][qtd])
    for(let i = 0; i < Object.values(arr)[0].length; i++) {

    }
    return found
}

fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data);
    let i = 0
    
    obj.data[1].fidelizado.forEach((data) => {
        if(data.mediaRec.day <= 1) {
            frequenteDepois.push([data, obj.data[0][i]])
        }
        if(data.mediaGasto / data.mediaRec.day >= 50) {
            gastadorDepois.push([data, obj.data[0][i]])
        }
        i++
    })
    obj.data[1].naoFidelizado.forEach((data) => {
        if(data.mediaRec.day <= 1) {
            frequenteAntes.push([data, obj.data[0][i]])
        }
        if(data.mediaGasto / data.mediaRec.day >= 50) {
            gastadorAntes.push([data, obj.data[0][i]])
        }
        i++
    })
    /*
    for(let i in obj.data[0]) {
        obj.data[0].forEach( (data) => {
            if(data.sex == "female") {
                mulheres.push([Object.values(obj.data[1])[0][i], data])
                //console.log(mulheres)
            }
            else {
                homens.push([Object.values(obj.data[1])[0][i], data])
            }
        })
    }
    */
    console.log(gastadorDepois.length)
    console.log(gastadorAntes.length)
    console.log(frequenteDepois.length)
    console.log(frequenteAntes.length)
}});
// console.log(mulheres)


// cliente frequente - antes/depois
// cliente gastador - antes/depois
// homens / mulheres
module.exports = {
    
}