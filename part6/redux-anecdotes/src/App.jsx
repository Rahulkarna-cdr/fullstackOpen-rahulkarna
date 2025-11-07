import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import FilterAnecdote from "./components/FilterAnecdote";
import Notification from "./components/Notification";
const App = () => {
  return (
    <div>
      <Notification />
      <FilterAnecdote />
     <AnecdoteList />
      <AnecdoteForm />      
    </div>
  );
};

export default App;
