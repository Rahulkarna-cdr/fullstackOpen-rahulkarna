import { useDispatch, useSelector } from "react-redux";
import { createAnecdote, voteIncrement } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  const anecdotes = useSelector((state) => 
  [...state].sort((a,b)=>b.votes - a.votes)
  );

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteIncrement(id));
  };

  const handleCreateAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(createAnecdote(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <AnecdoteForm handleCreateAnecdote={handleCreateAnecdote} />
      
    </div>
  );
};

export default App;
