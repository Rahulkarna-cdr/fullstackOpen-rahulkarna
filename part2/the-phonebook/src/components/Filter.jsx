import React from 'react'

function Filter({setSearchQuery}) {
  return (
    <div>
    <span>filter shown with <input onChange={(e)=>setSearchQuery (e.target.value)} /></span>
    </div>
  )
}

export default Filter
