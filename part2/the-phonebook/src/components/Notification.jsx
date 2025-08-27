import React from 'react'
import '../index.css'

function Notification({message, notification}) {
    if(!message && !notification){
        return null
    }

  return (
    <>
    {message && <div className='error'>
        {message}
    </div>}
    {notification && <div className='success'>
        {notification}
    </div>}
    </>
  )
}

export default Notification