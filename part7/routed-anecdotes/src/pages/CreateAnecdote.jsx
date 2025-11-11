import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


    const navigate = useNavigate()
  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.inputField.value,
        author:author.inputField.value,
        info:info.inputField.value,
        votes: 0
      })
      props.setNotification(`a new anecdote ${content.inputField.value} created!`);
      navigate('/')
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content.inputField} />
          </div>
          <div>
            author
            <input {...author.inputField} />
          </div>
          <div>
            url for more info
            <input {...info.inputField} />
          </div>
          <button type='submit'>create</button>
        </form>
          <button onClick={()=>{content.reset();author.reset();info.reset()}}>reset</button>
      </div>
    )
  
  }

export default CreateNew