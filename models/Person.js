const mongoose = require('mongoose')

/**Criando uma tabela Person no banco de dados */
const Person = mongoose.model('Person', {
    name: String,
    salary: Number,
    approved: Boolean,
})

module.exports = Person