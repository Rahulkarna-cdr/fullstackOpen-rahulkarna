import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import anecdoteService from './services/anecdoteService'

const App = () => {  

  const {data: anecdotes, isLoading, isError} = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }


 if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  
  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
