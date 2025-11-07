import React from "react";
import { voteIncrement } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";
import { setNotification, clearNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes);
  });

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteIncrement(anecdote.id));
    const notify = 
    dispatch(setNotification(`You voted '${anecdote.content}'`))
    setTimeout(()=>{
      dispatch(clearNotification())
    },5000)
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
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
