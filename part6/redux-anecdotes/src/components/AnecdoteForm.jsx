import { useDispatch } from "react-redux";
import { createAnecdote, setAnecdotes } from "../reducers/anecdoteReducer";
import anecdotesService from "../services/anecdotesService";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleCreateAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    const newAnecdote = await anecdotesService.createAnecdote(content)
    dispatch(createAnecdote(newAnecdote))
    }

  return (
    <div>
        <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm