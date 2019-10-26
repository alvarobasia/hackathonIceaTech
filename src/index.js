/*const fetch = require("node-fetch")
let offset = 0
let perPage = 0
let results = []
let ids = []
let dados = {
    fidelizado: [],
    naoFidelizado: []
}
let campos = [ids, dados]

function Construtor(mediaRec, pos, mediaGasto, mediaConsumo) {
    return {
        mediaRec,
        pos,
        mediaGasto,
        mediaConsumo
    }
}

const calculos = function(data, posicao) {
    let a = campos[0].indexOf(data.cliente.id)
    if(a == -1) {
        campos[0].push(data.cliente.id)
        if(data.points > 0) {
            campos[1].fidelizado.push(new Construtor([[data.date.dia, data.date.mes]],posicao,[data.price, 1],[data.quantity, 1]))
            campos[1].naoFidelizado.push(new Construtor([], posicao, [0, 0], [0, 0]))
        }
        else {
            campos[1].fidelizado.push(new Construtor([], posicao, [0, 0], [0, 0]))
            campos[1].naoFidelizado.push(new Construtor([[data.date.dia, data.date.mes]],posicao,[data.price, 1],[data.quantity, 1]))
        }    
    }
    else {
        if(data.points > 0) {
            campos[1].fidelizado[a].mediaRec.push([data.date.dia, data.date.mes])
            campos[1].fidelizado[a].mediaGasto[0] += data.price
            campos[1].fidelizado[a].mediaGasto[1]++
            campos[1].fidelizado[a].mediaConsumo[0] += data.quantity
            campos[1].fidelizado[a].mediaConsumo[1]++
        }
        else {
            campos[1].naoFidelizado[a].mediaRec.push([data.date.dia, data.date.mes])
            campos[1].naoFidelizado[a].mediaGasto[0] += data.price
            campos[1].naoFidelizado[a].mediaGasto[1]++
            campos[1].naoFidelizado[a].mediaConsumo[0] += data.quantity
            campos[1].naoFidelizado[a].mediaConsumo[1]++
        }
    }

}
negocios = []
fetch(`https://hackaengine-dot-red-equinox-253000.appspot.com/sales?offset=0&per_page=200`)
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
for(n of negocios) {
    i = 0
    n.forEach((data) => {
        calculos(data, offset + i)
        i++
    })
    offset += 200
}
console.log(campos)
}, 20000)




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
function subtractDates(d1, d2) {
    let a = new Date(2019, 5, d2.day, d2.hours, d2.minutes)
    let b = new Date(2019, 5, d1.day, d1.hours, d1.minuts)
    let c = Math.abs(a.getTime() - b.getTime())
    let result = Math.ceil(c / (1000 * 60 * 60 * 24))
    let d = Math.abs(a.getMinutes() - b.getMinutes())
    let g = Math.abs(a.getHours() - b.getHours())
    return ConstructorDate(result,g,d)
}

