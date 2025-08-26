import React from 'react'

function Names({persons, deleteNum}) {
  return (
    <div>
        {persons.map((person,index)=><p key={index+1}>{person.name} {person.number} <button onClick={()=>deleteNum(person.id)}>delete</button></p>)}
    </div>
  )
}

export default Names