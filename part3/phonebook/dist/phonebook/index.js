require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('../phonebook/models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))



morgan.token('post-data',(request)=>{
  return request.method === "POST"?JSON.stringify(request.body):""
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data '))


app.get('/api/persons',(request, response)=>{
  Person.find({}).then(result =>{
  response.status(200).json(result)})
})

app.post('/api/persons',(request,response, next)=>{
  const {name, number} = request.body

  if(!name|| !number){
    return response.status(400).json({error:'number or name is missing'})
  }

  Person.findOne({ name }).then(existingPerson => {
    if(existingPerson){
      return response.status(400).json({error: 'name must be unique'})
    }
    
    const newPerson = new Person( { name, number})
    newPerson.save().then(savedPerson=> {
      response.json(savedPerson)
    })
    .catch(error => next(error))
  })
})

app.put('/api/persons/:id', (request,response, next)=>{
  const {name, number} = request.body

  Person.findById(request.params.id)
  .then(person =>{
    if(!person){
    return response.status(404).end()
    }
    person.name = name
    person.number = number

    return person.save()
    .then(updatedPerson =>{
      response.json(updatedPerson)
    })
    .catch(error => next(error))
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request,response, next)=>{

  Person.findById(request.params.id)
  .then(person =>{
    if(!person){
      return response.status(404).end()
    }
    
    response.status(200).json(person)
    
  })
  .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
      const date = new Date()
      response.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`)
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (request,response,next)=>{
  Person.findByIdAndDelete(request.params.id)
  .then(()=>response.status(204).end())
  .catch(error => next(error))
}) 

const errorHandler = (error,request, response, next)=>{
  console.error(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({error: 'malformatted ID'})
  } else if(error.name === 'ValidationError'){
    return response.status(400).send( {error: error.message})
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT ? process.env.PORT : 3001
app.listen(PORT)
console.log(`the server is started at port ${PORT}`)
