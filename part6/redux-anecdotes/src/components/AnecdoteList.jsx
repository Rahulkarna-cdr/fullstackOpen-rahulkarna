import React, { useEffect } from "react";
import { voteIncrement } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";
import { setNotification, clearNotification } from "../reducers/notificationReducer";
import { getAllAnecdotes } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector(state => state.filter);
  const filteredData = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  const sortedData = filteredData.sort((a, b) => b.votes - a.votes)

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteIncrement(anecdote.id));
    dispatch(setNotification(`You voted '${anecdote.content}'`))
    setTimeout(()=>{
      dispatch(clearNotification())
    },5000)
  };

  useEffect(()=>{
      dispatch(getAllAnecdotes())
    },[])

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedData.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
