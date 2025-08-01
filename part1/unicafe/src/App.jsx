import { useState } from 'react'
import Statistics from './components/Statistics'
import Button from './components/Button'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give feedback</h1>
      <Button value="good" handlerFunc={()=>setGood(good+1)}/>
      <Button value="neutral" handlerFunc={() => setNeutral(neutral+1)} />
      <Button value="bad" handlerFunc={()=> setBad(bad+1)} />
      <Statistics good={good} bad={bad} neutral={neutral} />
      

      
    </>
  )
}

export default App