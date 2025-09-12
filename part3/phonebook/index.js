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

app.post('/api/persons',(request,response)=>{
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
  })
})


const PORT = process.env.PORT ? process.env.PORT : 3001
app.listen(PORT)
console.log(`the server is started at port ${PORT}`)
