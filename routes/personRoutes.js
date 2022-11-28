const router = require('express').Router()

const Person = require('../models/Person')

//Rota para inserir pessoas no sistema
router.post('/', async (req, res) => {
    //desestruturando o req.body, criando uma variavel para name, salary e approved
    const { name, salary, approved } = req.body

    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatório' })
        //return para o resto da função não executar
        return
    }

    const person = {
        name,
        salary,
        approved
    }

    try {
        //Criando dados no mongoDB
        await Person.create(person)
        res.status(201).json({ messagem: 'Pessoa inserida no sistema com sucesso' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Read - Leitura de dados
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async (req, res) => {
    //Extrair dado da requisição, pela url o dado fica no req.params
    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id })

        if (!person) {
            res.status(422).json({ message: 'O usuário não foi encontrado' })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Atualizar dado específico
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved
    }
    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person)

        /**matchedCount é quantos dados foram atualizados */
        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({ message: 'O usuario não foi encontrado !' })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const person = await Person.deleteOne({ _id: id })

        if (!person) {
            res.status(422).json({ message: 'Úsuario inválido' })
            return
        }

        res.status(200).json({ message: 'Usúario deletado' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router