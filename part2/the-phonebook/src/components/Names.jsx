import React from 'react'

function Names({persons}) {
  return (
    <div>
        {persons.map((person,index)=><p key={index+1}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default Names