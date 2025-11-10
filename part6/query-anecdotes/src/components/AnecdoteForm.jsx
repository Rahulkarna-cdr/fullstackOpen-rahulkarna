import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'
import anecdoteService from '../services/anecdoteService'
import { useNotificationDispatch } from '../context/NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const timeoutId = useRef()

  const showNotification = (message) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }
    dispatch({ type: 'SHOW', payload: message })
    timeoutId.current = setTimeout(() => {
      dispatch({ type: 'HIDE' })
      timeoutId.current = undefined
    }, 5000)
  }

  const newNoteMutation = useMutation({
    mutationFn: anecdoteService.createAnecdote,
    onSuccess: (createdAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      showNotification(`anecdote '${createdAnecdote.content}' created`)
    },
    onError: (error) => {
      showNotification(error.message)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()

    if (!content) {
      showNotification('anecdote content is required')
      return
    }

    event.target.anecdote.value = ''
    newNoteMutation.mutate({ content, votes: 0 })
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
