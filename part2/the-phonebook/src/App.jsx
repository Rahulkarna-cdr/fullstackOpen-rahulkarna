import { useEffect, useState } from 'react'
import phoneNums from './services/phonebook'
import Names from './components/Names'
import Filter from './components/Filter'
import UserForm from './components/UserForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')


  //creating a newPerson and their Number
  const handlerFunc = (e)=>{
    e.preventDefault()
    const nameExists = persons.find(person => person.name === newName);

    if (nameExists) {
      handleUpdate(nameExists.id)
      return;
    }
    const anObj = {
      name: newName,
      number: newNumber
    }
    phoneNums
    .create(anObj)
    .then((returnedNum)=>{
      setPersons(persons.concat(returnedNum))
      setNewName('')
      setNewNumber('')
    })
  }
  useEffect(()=>{
    phoneNums
    .getAll()
    .then(initalNum=>{
      setPersons(initalNum)
    }).catch(error=>console.error('error fetching persons',error))
  },[])

  //updating phone Number
  const handleUpdate= (id)=>{
    const existNum  = persons.find((person)=>person.id===id)
    const changeNum = {...existNum, number: newNumber }
    const confirmUpdate = window.confirm(`${changeNum.name} is already added to phonebook, replace the old number with a new One`)
    if(!confirmUpdate) return;

    phoneNums
    .update(changeNum,id)
    .then(modifyingNum =>{
      const updatedPersons = persons.map(person => person.id!==id?person: modifyingNum)
      setPersons(updatedPersons)
    })
  }
  //Deleting a phone Number
  function deletingNumber(id){
    const deletePerson = persons.find((person)=>person.id===id )
    const confirmed = window.confirm(`Delete ${deletePerson.name} ?`)
    if(!confirmed) return;

    phoneNums
    .deleteObj(id)
  .then(response =>{
    const updatedPhoneBook = persons.filter(person=> person.id!==id)
    setPersons(updatedPhoneBook)
  } ).catch(error => console.error('error deleting', error))
  }

  const searchedVal = persons.filter( (person)=> person.name.toLowerCase().includes(searchQuery.toLowerCase())) 

  return (

  
    <div>
      <h2>Phonebook</h2>
      <Filter setSearchQuery={setSearchQuery} />
      <UserForm handlerFunc={handlerFunc} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      
      <h2>Numbers</h2>
      <Names persons={searchedVal} deleteNum={deletingNumber}/>
    </div>
  )
}

export default App