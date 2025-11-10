import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {
const queryClient = useQueryClient()

  const newNoteMutation = useMutation({
    mutationFn: anecdoteService.createAnecdote,
    onSuccess: (createdAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNoteMutation.mutate({content, votes:0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
