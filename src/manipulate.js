const fs = require('fs')
let obj
let frequenteAntes = []
let gastadorAntes = []
let frequenteDepois = []
let gastadorDepois = []
let mulheres = []
let homens = []
let mediaFreqAntes = 0
let mediaFreqDepois = 0
let mediaGastadorAntes = 0
let mediaGastadorDepois = 0

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
    let total = 0
    obj.data[1].fidelizado.forEach((data) => {
        if(data.mediaRec.day <= 1) {
            frequenteDepois.push([data, obj.data[0][i]])
        }
        if(data.mediaGasto / data.mediaRec.day >= 50) {
            gastadorDepois.push([data, obj.data[0][i]])
        }
        mediaGastadorDepois += data.mediaGasto
        mediaFreqDepois += (typeof data.mediaRec == 'object') ? data.mediaRec.day : data.mediaRec
        total++
        i++
    })
    mediaGastadorDepois /= total
    mediaFreqDepois /= total
    total = 0
    obj.data[1].naoFidelizado.forEach((data) => {
        if(data.mediaRec.day <= 1) {
            frequenteAntes.push([data, obj.data[0][i]])
        }
        if(data.mediaGasto / data.mediaRec.day >= 50) {
            gastadorAntes.push([data, obj.data[0][i]])
        }
        mediaFreqAntes += data.mediaRec.day
        mediaGastadorAntes += data.mediaGasto
        i++
        total++
    })
    mediaFreqAntes /= total
    mediaGastadorAntes /= total
    /*
    let total = 0
    console.log(frequenteAntes[1])
    frequenteAntes[1].forEach((data) => {
        total++
        mediaFreqAntes += data.mediaGasto
    })
    mediaFreqAntes /= total
    total = 0
    frequenteDepois[1].forEach((data) => {
        total++
        mediaFreqDepois += data.mediaGasto
    })
    mediaFreqDepois /= total
    total = 0
    gastadorDepois[1].forEach((data) => {
        total++
        mediaGastadorDepois += data.mediaRec.dia
    })
    mediaGastadorDepois /= total
    total = 0
    gastadorAntes[1].forEach((data) => {
        total++
        mediaGastadorAntes += data.mediaRec.dia
    })
    mediaGastadorAntes /= total
    */
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
   console.log(mediaGastadorAntes)
   console.log(mediaGastadorDepois)
   console.log(mediaFreqAntes)
   console.log(mediaFreqDepois)
   console.log(0.41)
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