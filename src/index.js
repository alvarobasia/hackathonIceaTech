const fetch = require("node-fetch")
var fs = require('fs')
let offset = 0
let perPage = 0
let results = []
let ids = []
let dados = {
    fidelizado: [],
    naoFidelizado: []
}

let campos = [ids, dados]
let objeto = {
    data: campos
}



function ConstructorDate(day, hours, minutes) {
    return {
        day, hours, minutes
    }
}

function subtractDates(d1, d2) {
    let a = new Date(2019, 5, d2.day, d2.hours, d2.minutes)
    let b = new Date(2019, 5, d1.day, d1.hours, d1.minutes)
    let c = Math.abs(a.getTime() - b.getTime())
    let result = Math.ceil(c / (1000 * 60 * 60 * 24))
    let d = Math.abs(a.getMinutes() - b.getMinutes())
    let g = Math.abs(a.getHours() - b.getHours())
    return ConstructorDate(result,g,d)
}

function dateToMili(date) {
    return date.day * 86400000 + date.hours * 3600000 + date.minutes * 60000
}

function ConstructorId(id, gender, age, sex) {
    return {
        id,
        gender,
        age,
        sex
    }
}

function Construtor(mediaRec, pos, mediaGasto, mediaConsumo) {
    return {
        mediaRec,
        pos,
        mediaGasto,
        mediaConsumo
    }
}

function miliToDate(time) {
    /*let remaining = time
    let day = Math.trunc(time/86400000)
    remaining -= time % 86400000
    let hour = Math.trunc(time/3600000)
    remaining -= time % 3600000
    let minutes = Math.trunc(time/60000)*/
    let date = new Date(time)
    let date2 = new Date(1970, 0, 1, 0, 0, 0, 0)
    return subtractDates(ConstructorDate(date.getDate(), date.getHours(), date.getMinutes()),
    ConstructorDate(date2.getDate(), date2.getHours(), date2.getMinutes()))
}

function encontraNoArray(arr, obj) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].id == obj)
            return i
    }
    return -1
}

const calculos = function(data, posicao) {
    let a = encontraNoArray(campos[0], data.cliente.id)
    if(a == -1) {
        campos[0].push(ConstructorId(data.cliente.id, data.cliente.data.sex, data.cliente.data.age, data.cliente.data.sex))
        if(data.points > 0) {
            campos[1].fidelizado.push(new Construtor([ConstructorDate(data.date.dia, data.date.hora, data.date.minuto)],
            posicao,[data.products[0].data.pricePerUnit * data.quantity, 1],[data.quantity, 1]))
            campos[1].naoFidelizado.push(new Construtor([], posicao, [0, 0], [0, 0]))
        }
        else {
            campos[1].fidelizado.push(new Construtor([], posicao, [0, 0], [0, 0]))
            campos[1].naoFidelizado.push(new Construtor([ConstructorDate(data.date.dia, data.date.hora, data.date.minuto)],
            posicao,[data.products[0].data.pricePerUnit * data.quantity, 1], [data.quantity, 1]))
        }    
    }
    else {
        // console.log("entrou no else")
        if(data.points > 0) {
            campos[1].fidelizado[a].mediaRec.push(ConstructorDate(data.date.dia, data.date.hora, data.date.minuto))
            campos[1].fidelizado[a].mediaGasto[0] += data.products[0].data.pricePerUnit * data.quantity
            campos[1].fidelizado[a].mediaGasto[1]++
            campos[1].fidelizado[a].mediaConsumo[0] += data.quantity
            campos[1].fidelizado[a].mediaConsumo[1]++
            // console.log(campos[1].fidelizado[a])
        }
        else {
            campos[1].naoFidelizado[a].mediaRec.push(ConstructorDate(data.date.dia, data.date.hora, data.date.minuto))
            campos[1].naoFidelizado[a].mediaGasto[0] += data.products[0].data.pricePerUnit * data.quantity
            campos[1].naoFidelizado[a].mediaGasto[1]++
            campos[1].naoFidelizado[a].mediaConsumo[0] += data.quantity
            campos[1].naoFidelizado[a].mediaConsumo[1]++
            // console.log(campos[1].fidelizado[a])
        }
    }

}
negocios = []
/*fetch(`https://hackaengine-dot-red-equinox-253000.appspot.com/sales?offset=0&per_page=200`)
        .then((data) => {
            return data.json()
        })
        .then((data) =>  {
                negocios.push(data)
            })
fetch(`https://hackaengine-dot-red-equinox-253000.appspot.com/sales?offset=200&per_page=200`)
        .then((data) => {
            return data.json()
        })
        .then((data) =>  {
                negocios.push(data)
            })
fetch(`https://hackaengine-dot-red-equinox-253000.appspot.com/sales?offset=400&per_page=200`)
        .then((data) => {
            return data.json()
        })
        .then((data) =>  {
                negocios.push(data)
            })
fetch(`https://hackaengine-dot-red-equinox-253000.appspot.com/sales?offset=600&per_page=200`)
        .then((data) => {
            return data.json()
        })
        .then((data) =>  {
                negocios.push(data)
            })
fetch(`https://hackaengine-dot-red-equinox-253000.appspot.com/sales?offset=800&per_page=200`)
        .then((data) => {
            return data.json()
        })
        .then((data) =>  {
                negocios.push(data)
            })
fetch(`https://hackaengine-dot-red-equinox-253000.appspot.com/sales?offset=1000&per_page=200`)
        .then((data) => {
            return data.json()
        })
        .then((data) =>  {
                negocios.push(data)
            })
fetch(`https://hackaengine-dot-red-equinox-253000.appspot.com/sales?offset=1200&per_page=101`)
        .then((data) => {
            return data.json()
        })
        .then((data) =>  {
                negocios.push(data)
            })
            //i = 0
            //data.forEach((data) => {
            //calculos(data, offset + i)
            //console.log(offset)
            //i++
setTimeout(() => {
    offset = 0
    soma = 0
    for(let n of negocios) {
        i = 0
        n.forEach((data) => {
            calculos(data, offset + i)
            i++
        })
        offset += 200
    }
    Object.values(campos[1]).forEach((current) => {
        current.forEach( (data) => {
            //inicio tempo
            let valoresData = []
            //console.log(data.mediaRec)
            if(data.mediaRec.length > 1) {
                for(let i = 0; i < data.mediaRec.length; i++) {
                    valoresData.push(dateToMili(data.mediaRec[i]))
                }
                let valoresOrdenados = valoresData.sort(function(a, b){return a - b});
                let mediaData = 0
                //console.log(valoresOrdenados)
                //console.log(valoresData)
                //console.log("\nVetor")
                let valoresFinais = []
                for(let i = 0; i < valoresOrdenados.length - 1; i++) {
                    valoresFinais.push(valoresOrdenados[i + 1] - valoresOrdenados[i])
                }
                valoresFinais.forEach( (n) => {mediaData += n})
                mediaData = Math.trunc(mediaData/valoresFinais.length)
                data.mediaRec = miliToDate(mediaData)
            }
            else if(data.mediaRec.length === 0){
                data.mediaRec = 0
            }
            else {
                data.mediaRec = 1
            }
            
            // fim tempo
            // inicio media gasto
            if(data.mediaGasto[1] !== 0)
                data.mediaGasto = data.mediaGasto[0] / data.mediaGasto[1]
            else {
                data.mediaGasto = 0
            }
            if(data.mediaConsumo[1] !== 0)
                data.mediaConsumo = data.mediaConsumo[0] / data.mediaConsumo[1]
            else
                data.mediaConsumo = 0
        })
    })
    var json = JSON.stringify(objeto);
    fs.writeFile('myjsonfile.json', json, 'utf8', () => console.log("Certinho"));
}, 60000)
*/




/*
let i = 0
for(offset = 0; offset < 1200; offset += 200) {
    fetch(`https://hackaengine-dot-red-equinox-253000.appspot.com/sales?offset=${offset}&per_page=${perPage}`)
        .then((data) => {
            return data.json()
        })
        .then((data) =>  {
            i = 0
            data.forEach((data) => {
            calculos(data, offset + i)
            console.log(offset)
            i++
            }
        )})
}
fetch(`https://hackaengine-dot-red-equinox-253000.appspot.com/sales?offset=${offset}&per_page=101`)
        .then((data) => {
            return data.json()
        })
        .then((data) => {
            i = 0
            data.forEach((data) => {
            calculos(data, offset + i)
            i++
            }
            )})
*/

/*
id
media de recorrencia
posicao
media de gasto
media de consumo
13 ao 20 nao tem venda fidelizada
*/


