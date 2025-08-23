import { useState } from 'react'
import Names from './components/Names'
import Filter from './components/Filter'
import UserForm from './components/UserForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')


  const handlerFunc = (e)=>{
    e.preventDefault()
    const nameExists = persons.filter(person => person.name === newName);

    if (nameExists.length>0) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    const anObj = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(anObj))
    setNewName('')
    setNewNumber('')
  }
  
  const searchedVal = persons.filter( (person)=> person.name.toLowerCase().includes(searchQuery.toLowerCase())) 

  return (

  
    <div>
      <h2>Phonebook</h2>
      <Filter setSearchQuery={setSearchQuery} />
      <UserForm handlerFunc={handlerFunc} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      
      <h2>Numbers</h2>
      <Names persons={searchedVal}/>
    </div>
  )
}

export default App