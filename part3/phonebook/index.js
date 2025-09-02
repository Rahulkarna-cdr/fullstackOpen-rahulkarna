const express = require('express')
const app = express()

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

app.get('/', (request,response)=>{
  response.json(persons)
})
app.delete('/api/persons/:id', (request,response)=>{
  const id = request.params.id
  persons = persons.filter((person) => person.id !==id)
  response.status(204).end()
})
const port = 3001
app.listen(port)
console.log(`server has started at port ${port}`)
