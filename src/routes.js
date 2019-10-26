const express = require('express')
const parser = require('body-parser')
const fs = require('fs')
const app = express()
const port = 3003
app.use(parser.urlencoded({extended:true}))

app.get('/',(req, res, next) =>{
    let content;
    fs.readFile('../myjsonfile.json', function read(err, data) {
        if (err) {
            throw err;
        }
        content = data;
        res.send(data)
    })
    console.log(JSON.stringify(content))
})
app.get('/dados', (req,res,next)=>{

})
app.listen(port, () => console.log(`Servidor executando na porta: ${port}`))