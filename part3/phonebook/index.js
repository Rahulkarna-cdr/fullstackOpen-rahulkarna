const express = require('express')
const app = express()

const data =[
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
  }
]

app.get('/', (request,response)=>{
  response.send(data)
})

app.get('/info', (request,response)=>{
  const date = new Date()
  response.send(`
  <p>phonebook has info for ${data.length} people </p>
  <p>${date}</p>
  `)
})

const port = 3001
app.listen(port)
console.log(`server has started at port ${port}`)
