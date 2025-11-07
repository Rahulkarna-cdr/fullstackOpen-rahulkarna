import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import FilterAnecdote from "./components/FilterAnecdote";

const App = () => {
  return (
    <div>
      <FilterAnecdote />
     <AnecdoteList />
      <AnecdoteForm />      
    </div>
  );
};

export default App;
