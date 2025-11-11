import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

useEffect(() => {
  if (!name) {
    setCountry(null)
    return
  }

  const fetchCountry = async () => {
    try {
      const response = await axios.get(`${baseUrl}/${name}`)
      setCountry({ found: true, data: response.data })
    } catch (error) {
      setCountry({ found: false })
    }
  }

  fetchCountry()
}, [name])
 
  return country
}

const Country = ({ country }) => {
if (!country) {
  return null
}

if (!country.found) {
  return <div>not found...</div>
}

const { name, capital, population, flags } = country.data

return (
  <div>
    <h3>{name.common}</h3>
    <div>capital {capital?.join(', ') ?? 'N/A'}</div>
    <div>population {population}</div>
    {flags?.png && (
      <img
        src={flags.png}
        height="100"
        alt={`flag of ${name.common}`}
      />
    )}
  </div>
)
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App