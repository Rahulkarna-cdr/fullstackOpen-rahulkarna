import React from 'react'

function UserForm({handlerFunc,newName,setNewName,newNumber,setNewNumber}) {
  return (
    <div>
        <form onSubmit={handlerFunc}>
        <div>
          <h2>add a new </h2>
          name: <input
          value={newName}
          onChange={(e)=>setNewName(e.target.value)} />
        </div>
        <div>
          number: <input
          value = {newNumber}
          onChange={(e)=>setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default UserForm