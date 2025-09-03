const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())

app.use(morgan('tiny'))

let persons =[
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  },
  { 
    "id": "5",
    "name": "Ruby Roundhouse", 
    "number": "45-56-2568458"
  }
]

app.post('/api/persons',(request,response)=>{
  const {name, number} = request.body

  if(!name|| !number){
    return response.status(400).json({error:'number or name is missing'})
  }

  const nameExist = persons.some(person => person.name === name)
  if(nameExist){
    return response.status(400).json({error: 'name must be unique'})
  }
  
  const newPerson = {
    id: Math.floor(Math.random()*100000),
    name,number
  }
  persons = persons.concat(newPerson)
  response.json(persons)
})


const port = 3001
app.listen(port)
console.log(`the server is started at port ${port}`)
