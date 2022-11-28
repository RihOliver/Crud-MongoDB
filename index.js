//Config inicial - Importando express para o projeto
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
//Iniciando como uma função
const app = express()


//Forma de ler JSON usando middleware do express para ser executados entre requisições e respostas.
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

//Configurando para a rota /person funcione junto a const PersonRoutes
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

/**Rota/Endpoint inicial*/
app.get('/', (req, res) => {
    res.json({ message: 'Oi express !' })
})


const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
/**Entregar uma porta para o express rodar e conexão com banco*/
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.plyy4cb.mongodb.net/?retryWrites=true&w=majority`
).then(() => {
    console.log("Conectamos ao MongoDB")
    app.listen(3000)
}).catch((err) => console.log(err))

